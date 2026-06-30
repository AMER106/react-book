# React Notes - useRef (Part 1)

## What is useRef?

> useRef is a React Hook that lets you reference a value that's not needed for rendering.

Simple words:

- Stores a value.
- Value persists between renders.
- Updating the value DOES NOT trigger a re-render.

---

# Syntax

```jsx
const ref = useRef(initialValue);
```

Example

```jsx
const countRef = useRef(0);
```

Access value

```jsx
countRef.current;
```

Update value

```jsx
countRef.current++;
```

---

# useState vs useRef

| useState            | useRef                   |
| ------------------- | ------------------------ |
| Stores state        | Stores mutable value     |
| Causes re-render    | Does NOT cause re-render |
| Used for UI values  | Used for non-UI values   |
| Updated with setter | Updated using `.current` |

---

# Golden Rule

If changing the value should update the UI

→ useState

If changing the value should NOT update the UI

→ useRef

---

# Example 1

```jsx
const ref = useRef(0);

<button
  onClick={() => {
    ref.current++;
  }}
>
  Increment
</button>;
```

What happens?

✅ Value changes

❌ Component does NOT re-render

---

# Example 2

```jsx
const ref = useRef(0);

return (
  <>
    <h1>{ref.current}</h1>

    <button
      onClick={() => {
        ref.current++;
      }}
    >
      Increment
    </button>
  </>
);
```

Output

Initially

```
0
```

After clicking 5 times

Still

```
0
```

Reason

React never re-rendered.

Memory became

```
ref.current = 5
```

UI still shows

```
0
```

---

# Important Concept

useRef updates the value.

It DOES NOT update the UI.

The UI only updates if something else (like useState) causes a re-render.

---

# DOM References

```jsx
const inputRef = useRef(null);

<input ref={inputRef} />;
```

After React commits the DOM

```
inputRef.current
```

contains

```
HTMLInputElement
```

---

# Focus Example

```jsx
const inputRef = useRef(null);

function handleClick() {
  inputRef.current.focus();
}

return (
  <>
    <input ref={inputRef} />
    <button onClick={handleClick}>Focus</button>
  </>
);
```

Result

Cursor moves inside the input.

Component does NOT re-render.

Reason

focus() is a Browser DOM API.

It does not change React state.

---

# Render Timeline

Function starts

↓

useRef(null)

↓

current = null

↓

return JSX

↓

Function ends

↓

React creates DOM

↓

React attaches refs

↓

inputRef.current = HTMLInputElement

↓

useEffect runs

---

# Reading ref.current

During render

```jsx
console.log(inputRef.current);
```

Output

```
null
```

Reason

DOM is not created yet.

---

Inside useEffect

```jsx
useEffect(() => {
  console.log(inputRef.current);
}, []);
```

Output

```
HTMLInputElement
```

Reason

DOM has already been created.

Refs are attached before useEffect runs.

---

# React World vs Browser World

React World

- State
- Props
- Rendering
- JSX

Changes here

↓

React re-renders.

---

Browser World

- focus()
- play()
- pause()
- scrollIntoView()
- select()

These directly manipulate the DOM.

They DO NOT trigger React re-renders.

---

# Interview Rule

Does changing ref.current re-render the component?

Answer

No.

Updating ref.current changes the stored value but React does not track it for rendering.

---

# Remember

useRef is NOT a replacement for useState.

Use useState for data that affects the UI.

Use useRef for values that React doesn't need to render.

---

# Common use cases of useRef

- DOM element reference
- Input focus
- Timer IDs
- Interval IDs
- Previous values
- Mutable values
- Avoid unnecessary re-renders
