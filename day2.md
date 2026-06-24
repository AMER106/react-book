# React Performance Notes

## React.memo

-   HOC that skips unnecessary child re-renders.
-   Uses shallow comparison (`Object.is`).
-   Works best with primitive props.
-   Objects/arrays/functions are compared by reference.

## useMemo

-   Caches the returned value.
-   Does NOT prevent component re-renders.
-   Prevents expensive recalculations.
-   Also provides stable object/array references.

Example:

``` jsx
const user = useMemo(() => ({ name: "Amer" }), []);
```

## useCallback

-   Caches a function reference.

Example:

``` jsx
const handleClick = useCallback(() => {
  console.log("Clicked");
}, []);
```

## Rendering Model

State changes ↓ Component executes again ↓ Heavy calculation? -\>
useMemo ↓ Object prop? -\> useMemo ↓ Function prop? -\> useCallback ↓
React.memo compares props ↓ Same? Skip child render

## Interview Points

-   React.memo -\> memoizes component rendering.
-   useMemo -\> memoizes returned value.
-   useCallback -\> memoizes function reference.
-   useMemo does not stop re-renders.
-   useCallback does not stop parent re-renders.

## Golden Summary

React.memo -\> Component rendering

useMemo -\> Returned value

useCallback -\> Function reference
