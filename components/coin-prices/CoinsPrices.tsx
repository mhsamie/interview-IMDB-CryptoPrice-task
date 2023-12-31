"use client";
import { Socket } from "../../services/socket";
import React, { useEffect, useRef, useState } from "react";
import Table from "../Table/Table";
import TableRow from "../Table/TableRow";
import TableCell from "../Table/TableCell";
import Image from "next/image";
import Spiner from "../loaders/Spiner";
import useGetCoins from "@/hooks/useGetCoinsQuery";

const CoinsPrices = () => {
  const [coinsPrice, setCoinPrice] = useState<{
    [key: string]: string;
  }>({});
  const coinsWS = useRef<any>(null);
  const { isSuccess, isLoading, refetch } = useGetCoins(setCoinPrice);

  const wsMessageListerner = () => {
    coinsWS.current.on("message", (e: MessageEvent) => {
      const useableDtat = JSON.parse(e.data);
      setCoinPrice((prev) => {
        return { ...prev, ...useableDtat };
      });
    });

    coinsWS.current.on("close", () => {
      setTimeout(function () {
        coinsWS.current = null;
        connectToServer();
      }, 3000);
    });
  };

  const connectToServer = () => {
    refetch();
    coinsWS.current = new Socket();
    coinsWS.current.connect(
      "wss://ws.coincap.io/prices??assets=bitcoin,ethereum,monero,ripple,bitcoin-cash,tether,binance-coin,eos,tron,ethereum-classic,stellar,cardano"
    );
    wsMessageListerner();
  };

  useEffect(() => {
    if (isSuccess) {
      connectToServer();
    }
    return () => {
      coinsWS.current?.close();
    };
  }, [isSuccess]);

  const cryptoIconEnum: { [key: string]: string } = {
    bitcoin: "btc",
    ethereum: "eth",
    monero: "xmr",
    ripple: "xrp",
    "bitcoin-cash": "bch",
    tether: "usdt",
    "binance-coin": "bnb",
    eos: "eos",
    tron: "trx",
    "ethereum-classic": "etc",
    stellar: "xlm",
    cardano: "ada",
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
        Object.keys(coinsPrice)?.map((eachCoin: string, i) => (
          <TableRow key={i} classes="border-b border-gray-600">
            <TableCell>
              <div className="flex gap-2 lg:gap-3 items-center">
                <Image
                  width={24}
                  height={24}
                  alt={eachCoin}
                  src={`https://coinicons-api.vercel.app/api/icon/${cryptoIconEnum[eachCoin]}`}
                />
                <span>{eachCoin}</span>
              </div>
            </TableCell>
            <TableCell>
              <span>{coinsPrice[eachCoin]}</span>
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
