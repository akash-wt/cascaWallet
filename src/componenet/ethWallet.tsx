import { HDNodeWallet, Wallet } from "ethers";
import { useEffect, useState } from "react";
import { mnemonicToSeed } from "bip39";
import axios from "axios";
import { ETHUrl } from "../config";
import { formatUnits } from "ethers";


export const EthWallet = (mnemonic: string) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [address, setAddress] = useState<string[]>([]);
    const [balances, setBalances] = useState<{ [key: string]: string }>({});

    useEffect(() => {

        address.forEach(async (key) => {
            const bal = await getBalance(key);
            setBalances((prev) => ({ ...prev, [key]: bal.toString() }));

        })
    }, [address])

    return (
        <div>
            <button onClick={async function () {
                const seed: Buffer = await mnemonicToSeed(mnemonic)
                const derivationPath: string = `m/44'/60'/${currentIndex}'/0'`;
                const hdNode = HDNodeWallet.fromSeed(seed);
                const childNodes = hdNode.derivePath(derivationPath);
                const wallet = new Wallet(childNodes.privateKey)
                setCurrentIndex(currentIndex + 1);
                setAddress([...address, wallet.address]);
            }}>Add ETH wallet</button>


            <ul>
                {address.map((addr, index) => (

                    <li key={index}>{addr} - Balance :  {balances[addr] ?? "Loading ..."} ETh</li>
                ))}
            </ul>
        </div>
    )
}



async function getBalance(publicKey: string) {
    try {
        const response = await axios.post(ETHUrl, {


            id: 1,
            jsonrpc: "2.0",
            params: [
                publicKey,
                "latest"
            ],
            method: "eth_getBalance"

        })



        return formatUnits(response.data.result,"ether");
    } catch (e) {
        console.log("Error fetching balance", e);
        return 0;

    }

}