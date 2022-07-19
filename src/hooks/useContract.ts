import { Interface } from '@ethersproject/abi'
import { allChains, chainId, useNetwork } from 'wagmi'

import WAGMI_ABI from './abi/Wagmi.json'

const WAGMI_ABI_INTERFACE = new Interface(WAGMI_ABI)

export const useWagmiContract = () => {
  const address = useWagmiContractAddress()
  return useMemo(
    () => ({
      addressOrName: address!,
      contractInterface: WAGMI_ABI_INTERFACE,
    }),
    [address]
  )
}

export const useWagmiContractAddress = () => {
  const { chain = allChains[0] } = useNetwork()

  return useMemo(
    () =>
      ({
        [chainId.mainnet]: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
        [chainId.rinkeby]: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
      }[chain.id]),
    [chain]
  )
}
