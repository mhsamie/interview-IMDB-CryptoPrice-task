"use client";
import { Socket } from "../../services/socket";
import React, { useEffect, useRef, useState } from "react";
import Table from "../Table/Table";
import TableRow from "../Table/TableRow";
import TableCell from "../Table/TableCell";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const CoinsPrices = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [coinsPrice, setCoinPrice] = useState({
    ethereum: "0",
    bitcoin: "0",
    monero: "0",
    litecoin: "0",
  });

  const coins = useRef<any>(null);
  const mainObject = useRef<any>(null);
  const useGetCoins = () => {
    const result = useQuery({
      queryKey: ["crypto-currencies"],
      queryFn: async () => {
        const data = await axios.get("https://api.coincap.io/v2/assets");
        return data.data.data.slice(0, 4);
      },
    });

    return result;
  };
  const { data } = useGetCoins();

  const wsMessageListerner = () => {
    coins.current.on("open", (e: any) => {
      setIsConnected(true);
    });
    coins.current.on("message", (e: any) => {
      const useableDtat = JSON.parse(e.data);

      setCoinPrice((prev) => {
        return { ...prev, ...useableDtat };
      });
    });
  };
  console.log(coinsPrice);

  const connectToServer = () => {
    coins.current = new Socket();
    coins.current.connect(
      "wss://ws.coincap.io/prices??assets=bitcoin,ethereum,monero,litecoin'"
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
  }, []);

  return (
    <Table
      tableHeads={[
        { label: "coin name", minWidth: "200" },
        { label: "coin price", minWidth: "200" },
      ]}
    >
      {coinsPrice !== null &&
        Object.keys(coinsPrice)?.map((m: any, i) => (
          <TableRow key={i}>
            <TableCell>
              <span>{m}</span>
            </TableCell>
            <TableCell>
              <span>{coinsPrice[m]}</span>
            </TableCell>
          </TableRow>
        ))}
    </Table>
  );
};

export default CoinsPrices;
