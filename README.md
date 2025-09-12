# 🪝 Hakenbox

A lightweight collection of reusable React hooks.

## 🧩 Hooks

| Hook                   | Description                                                               | Code ↗            | Demo ↗            |
|------------------------|---------------------------------------------------------------------------|-------------------|-------------------|
| `useDebounce`          | Delays updating the returned value until after a specified delay          | [View][debounce-code] | [View][debounce-demo]     |
| `useDerivedState`      | Provides state along with a memoized derived value function               | [View][derived-code]  | [View][derived-demo] |
| `useHistory`           | Manages state with optional history tracking                              | [View][history-code]  | [View][history-demo] |
| `useLocalStorageCSR`   | Persists state to `localStorage` and restores it immediately during render | [View][csr-code]      | [View][csr-demo]     |
| `useLocalStorageState` | Same as above, but designed for SSR environments                          | [View][ssr-code]      | [View][ssr-demo]     |
| `useParams`            | Manages URL search parameters as state                                    | [View][params-code]   | [View][params-demo]  |
| `useControlState`      | llows a value to be optionally controlled by the parent component         | [View][control-code]   | [View][control-demo]  |

[debounce-code]: https://github.com/bpetermann/hakenbox/blob/main/packages/hakenbox/src/lib/hooks/useDebounce.tsx  
[debounce-demo]: https://github.com/bpetermann/hakenbox/blob/main/packages/playground-vite/src/components/DebounceDemo.tsx  
[derived-code]: https://github.com/bpetermann/hakenbox/blob/main/packages/hakenbox/src/lib/hooks/useDerivedState.tsx  
[derived-demo]: https://github.com/bpetermann/hakenbox/blob/main/packages/playground-vite/src/components/DerivedDemo.tsx  
[history-code]: https://github.com/bpetermann/hakenbox/blob/main/packages/hakenbox/src/lib/hooks/useHistory.tsx  
[history-demo]: https://github.com/bpetermann/hakenbox/blob/main/packages/playground-vite/src/components/HistoryDemo.tsx  
[csr-code]: https://github.com/bpetermann/hakenbox/blob/main/packages/hakenbox/src/lib/hooks/useLocalStorageCSR.tsx  
[csr-demo]: https://github.com/bpetermann/hakenbox/blob/main/packages/playground-vite/src/components/StorageStateDemo.tsx  
[ssr-code]: https://github.com/bpetermann/hakenbox/blob/main/packages/hakenbox/src/lib/hooks/useLocalStorageState.tsx  
[ssr-demo]: https://github.com/bpetermann/hakenbox/blob/main/packages/playground-next/src/app/components/StorageStateDemo.tsx  
[params-code]: https://github.com/bpetermann/hakenbox/blob/main/packages/hakenbox/src/lib/hooks/useParams.tsx  
[params-demo]: https://github.com/bpetermann/hakenbox/blob/main/packages/playground-vite/src/components/ParamsDemo.tsx
[control-code]: https://github.com/bpetermann/hakenbox/blob/main/packages/hakenbox/src/lib/hooks/useControlState.tsx  
[control-demo]: https://github.com/bpetermann/hakenbox/blob/main/packages/playground-vite/src/components/ControlDemo.tsx
