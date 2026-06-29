# 05 - useEffect

## What is useEffect?

`useEffect` is a React Hook that lets you synchronize your component with an **external system**.

External systems include:

- API Calls
- Timers (`setInterval`, `setTimeout`)
- Event Listeners
- WebSocket Connections
- Local Storage
- Third-party libraries (Google Maps, Chart.js)

If you're **not synchronizing with an external system**, you probably **don't need useEffect**.

---

# Syntax

```jsx
useEffect(() => {
  // Setup

  return () => {
    // Cleanup
  };
}, [dependencies]);
```

---

# How useEffect Executes

### Initial Render

```
Component renders

↓

React commits UI

↓

useEffect runs
```

---

### Dependency Changes

```
Component re-renders

↓

Dependencies changed

↓

Cleanup runs

↓

New Effect runs
```

---

### Component Unmount

```
Component removed

↓

Cleanup runs
```

---

# Dependency Array

## 1. No Dependency Array

```jsx
useEffect(() => {});
```

Runs after **every render**.

---

## 2. Empty Dependency Array

```jsx
useEffect(() => {}, []);
```

Runs only **once after mount**.

(StrictMode runs it twice in development.)

---

## 3. Dependency Array

```jsx
useEffect(() => {}, [count]);
```

Runs

- Initial render
- Whenever `count` changes

---

# Reactive Values

Reactive values include:

- Props
- State
- Variables declared inside the component
- Functions declared inside the component

Every reactive value used inside an Effect **must** be included in the dependency array.

---

# Cleanup Function

```jsx
return () => {};
```

Cleanup is used to undo previous work.

Examples:

- clearInterval()
- removeEventListener()
- disconnect WebSocket
- Abort/ignore API request

---

# Cleanup Execution

```
Old Effect

↓

Cleanup

↓

New Effect
```

Cleanup does **not** mean component unmounted.

It also runs before the next Effect whenever dependencies change.

---

# StrictMode

Development:

```
Setup

↓

Cleanup

↓

Setup
```

Production:

```
Setup
```

React does this to verify your cleanup logic.

---

# Removing Unnecessary Object Dependencies

❌ Bad

```jsx
const options = {
  roomId,
  serverUrl,
};

useEffect(() => {}, [options]);
```

Objects are recreated every render.

Different reference.

Effect runs unnecessarily.

---

✅ Better

```jsx
useEffect(() => {
  const options = {
    roomId,
    serverUrl,
  };
}, [roomId, serverUrl]);
```

---

# Removing Unnecessary Function Dependencies

❌ Bad

```jsx
function createOptions() {}

useEffect(() => {}, [createOptions]);
```

Functions are recreated every render.

---

✅ Better

```jsx
useEffect(() => {
  function createOptions() {}
}, [roomId]);
```

---

# Functional State Updater

❌

```jsx
setCount(count + 1);
```

Requires

```jsx
[count];
```

Effect keeps recreating intervals.

---

✅ Better

```jsx
setCount((c) => c + 1);
```

React provides the latest state.

No dependency needed.

---

# Fetching Data

```jsx
useEffect(() => {

    fetch(...)

}, []);
```

Works.

But be careful about **Race Conditions**.

---

# Race Condition

Example

```
Apple Request

↓

Banana Request

↓

Banana Response

↓

Apple Response
```

Without cleanup:

Final UI

```
Apple ❌
```

Even though user selected Banana.

---

## Solution

```jsx
let ignore = false;

fetch(...).then(data => {

    if(!ignore){
        setData(data);
    }

});

return () => {
    ignore = true;
};
```

Old responses are ignored.

---

# Effect Events (React 19)

`useEffectEvent` lets you:

- Read latest props/state
- Without making them dependencies
- Without re-running the Effect

Useful for separating reactive and non-reactive logic.

---

# Custom Hooks

If multiple components share the same Effect logic...

Don't copy-paste.

Extract it into a custom Hook.

Example

```jsx
useChatRoom();

useWindowListener();

useUserLocation();

useFetch();
```

Benefits:

- Reusable
- Cleaner components
- Easier maintenance

---

# Controlling Non-React Widgets

Examples

- Google Maps
- Chart.js
- Three.js
- Monaco Editor

Initialize them inside `useEffect`.

---

# Server vs Client

`useEffect` runs only on the **client**.

It does **not** run during server rendering.

---

# Common Interview Questions

### What is useEffect?

Synchronizes React with external systems.

---

### When should we use useEffect?

Whenever we need to interact with an external system.

---

### Does useEffect run before render?

No.

Component renders first.

Then React commits.

Then Effect runs.

---

### When does cleanup execute?

- Before the next Effect (if dependencies changed)
- On component unmount

---

### Why shouldn't objects/functions be dependencies?

Because they are recreated every render.

Different reference.

Effect runs unnecessarily.

---

### Why use functional updater?

To avoid unnecessary dependencies and repeated Effect setup.

---

### What is a race condition?

Older API responses arriving after newer ones and overwriting the latest UI.

---

### Does useEffect run on the server?

No.

Only on the client.

---

# Mistakes I Made

- Initially confused cleanup with unmount.
- Thought dependency array could contain any value.
- Didn't understand why object/function dependencies cause unnecessary Effect runs.
- Confused `setCount(count + 1)` with functional updater.
- Didn't understand race conditions initially.
- Learned that cleanup prevents stale API responses from updating the UI.

---

# Quick Revision

- useEffect synchronizes with external systems.
- Cleanup runs before the next Effect and on unmount.
- Every reactive value must be declared as a dependency.
- Objects/functions created during render should not be dependencies.
- Use functional updater when updating state from previous state.
- Cleanup prevents race conditions.
- Extract repeated Effects into custom Hooks.
- useEffect only runs on the client.

---

# Status

✅ useEffect Completed

Next Hook:

➡️ useRef
