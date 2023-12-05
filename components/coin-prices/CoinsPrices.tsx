"use client";
import { Socket } from "../../services/socket";
import React, { useEffect, useRef, useState } from "react";
import Table from "../Table/Table";
import TableRow from "../Table/TableRow";
import TableCell from "../Table/TableCell";

const CoinsPrices = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [coinData, setCoinData] = useState({});

  const coins = useRef<any>(null);
  const mainObject = useRef<any>(null);

  const wsMessageListerner = () => {
    coins.current.on("open", () => setIsConnected(true));
    coins.current.on("message", (e: any) => {
      const useableDtat = JSON.parse(e.data);
      const mainCoins = mainObject.current;
      //@ts-ignore
      setCoinData({ ...coinData, ...useableDtat });
    });
  };
  console.log(coinData);
  const connectToServer = () => {
    coins.current = new Socket();
    coins.current.connect("wss://ws.coincap.io/prices?assets=ALL");
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
    <Table tableHeads={[{ label: "hi", minWidth: "200" }]}>
      {mainObject?.current !== null &&
        [...mainObject?.current]?.map((m: any) => (
          <TableRow>
            <TableCell>
              <span>test</span>
            </TableCell>
          </TableRow>
        ))}
    </Table>
  );
};

export default CoinsPrices;
