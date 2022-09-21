import React, { createContext, ReactNode, useContext } from "react"
import { container } from "./container"

const ContainerContext = createContext<any>(undefined)

interface IContainerProviderProps {
    children: ReactNode
}

export const ContainerProvider = ({ children }: IContainerProviderProps): JSX.Element => {
    return <ContainerContext.Provider value={container}>{children}</ContainerContext.Provider>
  }

export const useContainer = () => {
  const container = useContext(ContainerContext)
  if (!container) {
    throw new Error("useContainer must be use within a ContainerProvider.")
  }
  return container
}