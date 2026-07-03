# React Notes - useMemo

## What is useMemo?

`useMemo` is a React Hook that memoizes (caches) the result of a calculation and recomputes it only when its dependencies change.

```jsx
const value = useMemo(() => {
  return expensiveCalculation();
}, [dependencies]);
```

---

# One Line Definition

useMemo caches a VALUE.

useCallback caches a FUNCTION.

---

# Syntax

```jsx
const memoizedValue = useMemo(() => {
  return someCalculation();
}, [dependencies]);
```

---

# How it works

Initial Render

↓

Runs callback

↓

Stores returned value

↓

Returns value

Next Render

↓

Checks dependencies

↓

If dependencies changed

↓

Runs callback again

↓

Stores new value

↓

Returns new value

If dependencies did NOT change

↓

Returns cached value

↓

Callback does NOT execute

---

# Example

```jsx
const doubled = useMemo(() => {
  return count * 2;
}, [count]);
```

If count changes

↓

Recalculate

If some other state changes

↓

Return cached value

---

# Example

```jsx
const [count, setCount] = useState(0);
const [text, setText] = useState("");

const doubled = useMemo(() => {
  console.log("Calculating...");
  return count * 2;
}, [count]);
```

Typing in the input

↓

Component re-renders

↓

Dependencies are same

↓

Callback does NOT run

↓

Cached value returned

---

# Important

Component re-render

≠

useMemo callback execution

React always re-renders the component.

After rendering, useMemo checks dependencies.

If same

↓

Returns cached value.

---

# Dependency Changed

```jsx
[count];
```

Old

```
0
```

New

```
1
```

↓

Different

↓

Run callback

↓

Store new value

---

# Dependency NOT Changed

Old

```
1
```

New

```
1
```

↓

Same

↓

Return cached value

---

# useMemo vs Normal Variable

Normal

```jsx
const doubled = count * 2;
```

Perfect for simple calculations.

useMemo

```jsx
const doubled = useMemo(() => count * 2, [count]);
```

Usually unnecessary.

---

# When should we use useMemo?

Only when

- Calculation is expensive
- Result can be reused
- Dependencies rarely change

Examples

- Filtering huge arrays
- Sorting thousands of records
- Heavy computations
- Expensive parsing

---

# Bad Example

```jsx
const fullName = useMemo(() => {
  return first + last;
}, [first, last]);
```

Not needed.

Simple string concatenation is very cheap.

---

# Good Example

```jsx
const filteredProducts = useMemo(() => {
  return products.filter((product) => product.category === category);
}, [products, category]);
```

Avoids filtering thousands of products on every render.

---

# Does useMemo stop component re-rendering?

No.

It only skips recalculating the memoized value.

The component still re-renders if state or props change.

---

# Does useMemo make everything faster?

No.

useMemo itself has a cost.

React must

- Store previous dependencies
- Compare dependencies
- Store cached value

For small calculations, this overhead is unnecessary.

---

# useMemo vs useCallback

useMemo

Caches a VALUE

```jsx
const value = useMemo(() => {
  return calculate();
}, []);
```

useCallback

Caches a FUNCTION

```jsx
const handleClick = useCallback(() => {
  console.log("Clicked");
}, []);
```

---

# Common Mistake

Using useMemo everywhere.

Wrong mindset

"I'll make my app faster."

Correct mindset

"I'll avoid repeating expensive calculations."

---

# Interview Questions

## Does useMemo stop re-renders?

No.

---

## Does useMemo always improve performance?

No.

It helps only when avoiding expensive recalculations.

---

## Difference between useMemo and useCallback?

useMemo caches a value.

useCallback caches a function.

---

## Can we replace

```jsx
const doubled = useMemo(() => count * 2, [count]);
```

with

```jsx
const doubled = count * 2;
```

Yes.

For simple calculations, this is preferred.

---

# Golden Rules

✅ useMemo caches values.

✅ Component still re-renders.

✅ Callback runs only if dependencies change.

✅ Don't optimize cheap calculations.

✅ Use only for expensive computations.

---

# Mental Model

Without useMemo

Render

↓

Calculation

↓

Render

↓

Calculation

↓

Render

↓

Calculation

---

With useMemo

Render

↓

Calculation

↓

Cache value

↓

Render

↓

Dependencies same?

↓

Yes

↓

Return cached value

↓

No calculation

↓

Dependencies changed?

↓

Yes

↓

Calculate again

↓

Update cache
