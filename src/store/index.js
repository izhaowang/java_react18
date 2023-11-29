import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

const useToken = create(
    persist(
        (set) => ({
            token: '',
            setToken: (val) => set({
                token: val
            })
        }),
        {
            name: "token-storage",
        }
    )
)

export default useToken
