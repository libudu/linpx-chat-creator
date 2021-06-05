import { throttle } from "lodash"
import { useCallback } from "react"

export const useCallbackThrottle = (func: (...args: any[]) => any) => {
  return useCallback(
    throttle(func, 200)
  , []);
}