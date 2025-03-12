import { useState } from 'react'
import { generateMnemonic } from 'bip39'
import { EthWallet } from './componenet/ethWallet'
import { SolanaWallet } from './componenet/solanaWallet'
import './App.css'

function App() {

  const [mnemonic, setMnemonic] = useState<string>("")


  return (
    <>
      <div >
        <button onClick={() => {
          const mn: string = generateMnemonic();
          setMnemonic(mn);
          
        }}> Create Seed Phrase</button>

        <div> {mnemonic}</div>

        <br />
        {EthWallet(mnemonic)}
        {SolanaWallet(mnemonic)}

      </div>
    </>
  )
}

export default App
