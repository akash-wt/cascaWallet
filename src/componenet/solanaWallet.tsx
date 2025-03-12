import { useState } from 'react'
import { mnemonicToSeed } from 'bip39'
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import axios from 'axios';
import { SolanaUrl } from '../config';


export function SolanaWallet(mnemonic: string) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKeys, setPubliicKeys] = useState<string[]>([]);


    return (
        <div>
            <button onClick={async () => {
                const seed = await mnemonicToSeed(mnemonic);
                const derivationPath = `m/44'/501'/${currentIndex}'/0'`;
                const derivedSeed = derivePath(derivationPath, seed.toString("hex")).key;

                const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
                const keypair = Keypair.fromSecretKey(secret);
                setCurrentIndex(currentIndex + 1);
                setPubliicKeys([...publicKeys, keypair.publicKey.toBase58()]);
            }}>Add Solana Wallet</button>

            <ul>
                {publicKeys.map((key, index) => (
                    <li key={index}> {key}</li>
                ))}
            </ul>
        </div>
    )
}


 async function  getBalance(publicKey: string) {
const response= axios.post(SolanaUrl,)
}