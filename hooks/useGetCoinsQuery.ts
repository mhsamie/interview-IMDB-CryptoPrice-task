import { assetsDataType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const useGetCoins = (setCoinPrice: React.Dispatch<React.SetStateAction<{
    [key: string]: string;
}>>) => {
    const result = useQuery({
        queryKey: ["crypto-currencies"],
        queryFn: async () => {
            const data = await axios.get(
                "https://api.coincap.io/v2/assets?ids=bitcoin,ethereum,monero,ripple,bitcoin-cash,tether,binance-coin,eos,tron,ethereum-classic,stellar,cardano"
            );
            const prices: { [keys: string]: string } = {};
            data.data.data.forEach(
                (asset: assetsDataType) => {
                    prices[asset.id] = Number(asset.priceUsd).toFixed(2).toString();
                }
            );
            setCoinPrice(prices);
            return data.data.data;
        },
    });

    return result;
};
export default useGetCoins