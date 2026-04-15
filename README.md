# 🪝 Hakenbox

A lightweight collection of reusable React hooks.

## 🧩 Hooks

| Hook                   | Description                                                                | Code ↗                | Demo ↗                |
| ---------------------- | -------------------------------------------------------------------------- | --------------------- | --------------------- |
| `useClickAway`         | Triggers a callback when clicked outside the referenced element            | [View][away-code]     | [View][away-demo]     |
| `useDebounce`          | Delays updating the returned value until after a specified delay           | [View][debounce-code] | [View][debounce-demo] |
| `useDerivedState`      | Provides state along with a memoized derived value function                | [View][derived-code]  | [View][derived-demo]  |
| `useHistory`           | Manages state with optional history tracking                               | [View][history-code]  | [View][history-demo]  |
| `useLocalStorageCSR`   | Persists state to `localStorage` and restores it immediately during render | [View][csr-code]      | [View][csr-demo]      |
| `useLocalStorageState` | Same as above, but designed for SSR environments                           | [View][ssr-code]      | [View][ssr-demo]      |
| `useParams`            | Manages URL search parameters as state                                     | [View][params-code]   | [View][params-demo]   |
| `useControlState`      | Allows a value to be optionally controlled by the parent component         | [View][control-code]  | [View][control-demo]  |
| `useFocusTrap`         | Create a focus trap within a specific DOM element                          | [View][focus-code]    | [View][focus-demo]    |
| `useAutoFocus`         | Automatically focus an input element on mount                              | [View][auto-code]     | [View][auto-demo]     |
| `useScrollToPosition`  | Imperatively scrolls a container element to a given position               | [View][scroll-code]   | [View][scroll-demo]   |

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
[focus-code]: https://github.com/bpetermann/hakenbox/blob/main/packages/hakenbox/src/lib/hooks/useFocusTrap.tsx
[focus-demo]: https://github.com/bpetermann/hakenbox/blob/main/packages/playground-vite/src/components/FocusTrapDemo.tsx
[away-code]: https://github.com/bpetermann/hakenbox/blob/main/packages/hakenbox/src/lib/hooks/useClickAway.tsx
[away-demo]: https://github.com/bpetermann/hakenbox/blob/main/packages/playground-vite/src/components/ClickAwayDemo.tsx
[auto-code]: https://github.com/bpetermann/hakenbox/blob/main/packages/hakenbox/src/lib/hooks/useAutoFocus.tsx
[auto-demo]: https://github.com/bpetermann/hakenbox/blob/main/packages/playground-vite/src/components/useAutoFocus.tsx
[scroll-code]: https://github.com/bpetermann/hakenbox/blob/main/packages/hakenbox/src/lib/hooks/useScrollToPosition.ts
[scroll-demo]: https://github.com/bpetermann/hakenbox/blob/main/packages/playground-vite/src/components/ScrollToPositionDemo.tsx
