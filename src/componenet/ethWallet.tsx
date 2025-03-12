import { HDNodeWallet, Wallet } from "ethers";
import { useState } from "react";
import { mnemonicToSeed } from "bip39";


export const EthWallet = (mnemonic: string) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [address, setAddress] = useState<string[]>([]);

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

                    <li key={index}> {addr}</li>
                ))}
            </ul>
        </div>
    )
}



