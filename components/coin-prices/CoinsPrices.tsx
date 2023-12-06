"use client";
import { Socket } from "../../services/socket";
import React, { useEffect, useRef, useState } from "react";
import Table from "../Table/Table";
import TableRow from "../Table/TableRow";
import TableCell from "../Table/TableCell";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Spiner from "../loaders/Spiner";

const CoinsPrices = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [coinsPrice, setCoinPrice] = useState<{
    [key: string]: string;
  }>({});

  const coins = useRef<any>(null);

  const useGetCoins = () => {
    const result = useQuery({
      queryKey: ["crypto-currencies"],
      queryFn: async () => {
        const data = await axios.get(
          "https://api.coincap.io/v2/assets?ids=bitcoin,ethereum,monero,ripple,bitcoin-cash,tether,bnb"
        );
        const prices: { [keys: string]: string } = {};
        data.data.data.forEach(
          (d: {
            changePercent24Hr: string;
            explorer: string;
            id: string;
            marketCapUsd: string;
            maxSupply: string;
            name: string;
            priceUsd: string;
            rank: string;
            supply: string;
            symbol: string;
            volumeUsd24Hr: string;
            vwap24Hr: string;
          }) => {
            prices[d.id] = Number(d.priceUsd).toFixed(2).toString();
          }
        );
        setCoinPrice(prices);

        return data.data.data;
      },
    });

    return result;
  };
  const { isSuccess, isLoading } = useGetCoins();
  const wsMessageListerner = () => {
    coins.current.on("open", () => {
      setIsConnected(true);
    });
    coins.current.on("message", (e: any) => {
      const useableDtat = JSON.parse(e.data);

      setCoinPrice((prev) => {
        return { ...prev, ...useableDtat };
      });
    });
  };

  const connectToServer = () => {
    coins.current = new Socket();
    coins.current.connect(
      "wss://ws.coincap.io/prices??assets=bitcoin,ethereum,monero,ripple,bitcoin-cash,tether,bnb"
    );
    wsMessageListerner();
  };

  //   useEffect(() => {
  //     if (!isConnected) setTimeout(() => connectToServer(), 3000);
  //   }, [isConnected]);

  useEffect(() => {
    connectToServer();
    return () => {
      if (coins) {
        setIsConnected(false);
        coins.current.close();
      }
    };
  }, [isSuccess]);
  const cryptoIconEnum: { [key: string]: string } = {
    bitcoin: "btc",
    ethereum: "eth",
    monero: "xmr",
    ripple: "xrp",
    bitcoincash: "bch",
    tether: "usdt",
    bnb: "bnb",
  };
  return (
    <Table
      tableHeads={[
        { label: "coin name", minWidth: "200" },
        { label: "coin price", minWidth: "200" },
      ]}
    >
      {isLoading && (
        <TableRow>
          <TableCell colSpan={2}>
            <Spiner />
          </TableCell>
        </TableRow>
      )}
      {coinsPrice ? (
        Object.keys(coinsPrice)?.map((m: string, i) => (
          <TableRow key={i} classes="border-b border-gray-600">
            <TableCell>
              <div className="flex gap-2 items-center">
                <Image
                  width={24}
                  height={24}
                  alt={m}
                  src={`https://coinicons-api.vercel.app/api/icon/${cryptoIconEnum[m]}`}
                />
                <span>{m}</span>
              </div>
            </TableCell>
            <TableCell>
              <span>{coinsPrice[m]}</span>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell>
            <span className="text-sm text-red-700">
              it seems you have a connection propblem. Trying again ...
            </span>
          </TableCell>
        </TableRow>
      )}
    </Table>
  );
};

export default CoinsPrices;
