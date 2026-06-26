# React Performance & Hooks Notes 🚀

> Source: React Docs + Our Discussions

---

# 1. React.memo

## What is React.memo?

`React.memo` is a Higher Order Component (HOC) that prevents unnecessary re-rendering of a child component.

It performs a **shallow comparison** of the previous props and current props.

If props are the same ➜ Skip child re-render.

If props changed ➜ Child re-renders.

---

## Syntax

```jsx
const Child = React.memo(function Child(props) {
  return <div>Hello</div>;
});
```

---

## Why do we need it?

Normally,

```
Parent Re-render
      ↓
Child Re-render
```

Even if child props didn't change.

React.memo prevents this.

---

## How does React.memo compare props?

Primitive values

```js
10 === 10;
true;
```

Strings

```js
"React" === "React";
true;
```

Objects

```js
{} === {}
false
```

Arrays

```js
[] === [];
false;
```

Functions

```js
(() => {}) === (() => {});
false;
```

Because Objects, Arrays and Functions are compared using **reference**, not value.

---

## Interview Question

Why does React.memo sometimes fail?

Answer:

Because Objects, Arrays and Functions receive new references every render.

---

# 2. useMemo

## What is useMemo?

useMemo caches the result of an expensive calculation.

It DOES NOT prevent rendering.

It only skips recalculating a value.

---

## Syntax

```jsx
const total = useMemo(() => {
  return expensiveCalculation(items);
}, [items]);
```

---

## Why use useMemo?

Without useMemo

```
Render
↓

Expensive calculation runs every render
```

With useMemo

```
Render
↓

Dependency changed?

No
↓

Return cached value
```

---

## Very Important

useMemo is NOT used for preventing re-renders.

It is only used for memoizing expensive calculations.

---

## Interview Question

Does useMemo stop component rendering?

Answer:

No.

Component still renders.

Only calculation is skipped.

---

# 3. Function Creation vs Function Execution

Very important concept.

---

## Function Creation

```jsx
const handleClick = () => {
  console.log("Hello");
};
```

Function is CREATED when component renders.

---

## Function Execution

```jsx
<button onClick={handleClick}>
```

Function executes only when user clicks.

---

Example

```jsx
console.log("Render");

const handleClick = () => {
  console.log("Executed");
};

console.log("Created");
```

Initial render

```
Render
Created
```

Button click

```
Executed
```

---

# 4. useCallback

## What is useCallback?

useCallback caches a function reference.

---

## Syntax

```jsx
const handleClick = useCallback(() => {
  console.log("Hello");
}, []);
```

---

## Why?

Without useCallback

```
Render 1

Function A

Render 2

Function B

Render 3

Function C
```

New function every render.

---

With useCallback

```
Render 1

Function A

Render 2

Function A

Render 3

Function A
```

Same function reference.

---

## Important

useCallback DOES NOT stop rendering.

It only returns the previous function reference if dependencies are unchanged.

---

## Dependency Changed?

```jsx
useCallback(() => {}, [count]);
```

count changes

↓

New function created.

---

## Dependency NOT Changed?

```jsx
useCallback(() => {}, []);
```

Old function reused.

---

## Interview Question

Does useCallback prevent re-renders?

Answer:

No.

It only memoizes function references.

---

# 5. React.memo + useCallback

Best friends ❤️

Without useCallback

```
Parent renders

↓

New Function

↓

React.memo

↓

Props changed

↓

Child renders
```

---

With useCallback

```
Parent renders

↓

Same Function Reference

↓

React.memo

↓

Props same

↓

Child skipped
```

---

Interview Question

Why are React.memo and useCallback often used together?

Answer:

Because functions get recreated every render.

useCallback keeps the function reference stable.

React.memo sees same props.

Child skips re-render.

---

# 6. useEffect

## What is useEffect?

useEffect lets us synchronize React with external systems.

Examples

- API Calls
- Timers
- LocalStorage
- WebSocket
- Event Listeners

---

## Syntax

```jsx
useEffect(() => {
  // setup

  return () => {
    // cleanup
  };
}, [dependencies]);
```

---

## When does useEffect run?

Render

↓

Commit DOM

↓

useEffect

NOT before render.

Always after render.

---

# 7. Cleanup Function

Cleanup runs

Before next Effect

and

On Unmount

Sequence

```
Render

↓

Effect

↓

Dependency changes

↓

Cleanup

↓

New Effect
```

---

## Strict Mode

Development only

Sequence

```
Render

↓

Effect

↓

Cleanup

↓

Effect
```

Purpose

To find bugs.

Production doesn't do this.

---

# 8. Dependency Array

Example

```jsx
useEffect(() => {}, [count]);
```

Effect runs

Initial render

-

Whenever count changes.

---

Empty array

```jsx
[];
```

Runs only once after initial mount.

---

No dependency array

```jsx
useEffect(() => {});
```

Runs after EVERY render.

---

# 9. Reactive Values

Reactive values include

- Props
- State
- Variables declared inside component
- Functions declared inside component

If Effect uses them,

They MUST be in dependency array.

---

Wrong

```jsx
useEffect(() => {
  console.log(count);
}, []);
```

React ESLint

Missing dependency.

---

Correct

```jsx
useEffect(() => {
  console.log(count);
}, [count]);
```

---

# 10. Object Dependencies

Wrong

```jsx
const options = {};

useEffect(() => {}, [options]);
```

Why?

Every render

↓

New object

↓

Reference changes

↓

Effect runs again.

---

Correct

Move object inside Effect.

```jsx
useEffect(() => {
  const options = {};
}, [roomId]);
```

---

# 11. Function Dependencies

Wrong

```jsx
function createOptions() {}

useEffect(() => {}, [createOptions]);
```

Every render

↓

New function

↓

Reference changes

↓

Effect runs again.

---

Correct

Move function inside Effect.

```jsx
useEffect(() => {
  function createOptions() {}
}, [roomId]);
```

---

# 12. Stale Closure ⭐⭐⭐⭐⭐

Wrong

```jsx
const handleClick = useCallback(() => {
  console.log(count);
}, []);
```

Initial

```
count = 0
```

Later

```
count = 5
```

Click

Output

```
0
```

Why?

Function remembered old value.

This is called

## Stale Closure

---

Correct

```jsx
const handleClick = useCallback(() => {
  console.log(count);
}, [count]);
```

Now latest count is printed.

---

# 13. Golden Rules

✅ State changes

↓

Component re-renders.

---

✅ React.memo

Skips Child Rendering.

---

✅ useMemo

Caches Values.

---

✅ useCallback

Caches Function References.

---

✅ useEffect

Runs AFTER render.

---

✅ Cleanup

Runs BEFORE next Effect.

---

✅ Objects

Reference comparison.

---

✅ Arrays

Reference comparison.

---

✅ Functions

Reference comparison.

---

✅ Numbers

Value comparison.

---

# Common Mistakes

❌ useMemo prevents rendering.

Wrong.

---

❌ useCallback prevents rendering.

Wrong.

---

❌ React.memo always skips rendering.

Wrong.

Props must be same.

---

❌ Ignore dependency warnings.

Wrong.

React ESLint usually prevents bugs.

---

# Interview Questions

### Q1

Why use React.memo?

Answer:

Prevent unnecessary child re-renders.

---

### Q2

Difference between useMemo and useCallback?

Answer:

useMemo → memoizes values.

useCallback → memoizes function references.

---

### Q3

Does useCallback stop parent rendering?

No.

---

### Q4

Why does React.memo fail with functions?

Because functions get recreated every render.

---

### Q5

Why shouldn't objects/functions be dependencies?

Because new references are created every render.

---

### Q6

What is Stale Closure?

A function remembering old state because dependencies were incorrect.

---

### Q7

When does cleanup run?

Before next Effect and on Unmount.

---

### Q8

When should we use useEffect?

Only when synchronizing with external systems.

---

# Mental Model

State changes

↓

Component re-renders

↓

Functions recreated

↓

Objects recreated

↓

React compares dependencies

↓

Dependencies changed?

↓

Yes

↓

Cleanup

↓

Effect

---

# Final Summary

React.memo

➡️ Memoizes Components

useMemo

➡️ Memoizes Values

useCallback

➡️ Memoizes Function References

useEffect

➡️ Synchronizes with External Systems

Cleanup

➡️ Undo previous Effect

Dependency Array

➡️ Controls when Effect or Callback runs
