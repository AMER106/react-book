# React Code Splitting & Lazy Loading -- Deep Notes

> Practical notes built from experiments, browser behavior, and
> interview discussions.

---

# 1. Why Code Splitting?

## Problem

A normal React app may generate:

```text
main.js (2 MB)
```

Every user downloads **everything**, even if they only visit the Home
page.

Problems:

- Slow initial load
- More JavaScript to parse
- Slower Time To Interactive (TTI)
- Poor Largest Contentful Paint (LCP)

---

# 2. What is Code Splitting?

**Definition**

Code splitting is the process of breaking one large JavaScript bundle
into multiple smaller bundles (chunks).

Example build output:

```text
main.js
dashboard.js
settings.js
```

## Important

Code splitting happens at **build time**.

The bundler (Vite/Webpack/Rollup) sees:

```js
import("./Dashboard");
```

and creates a separate chunk.

---

# 3. What is Lazy Loading?

Lazy loading means loading a chunk **only when it is needed**.

```jsx
const Dashboard = lazy(() => import("./Dashboard"));
```

Dashboard is NOT downloaded on the initial page load.

It downloads only when React tries to render it.

---

# 4. Runtime Flow

User clicks Dashboard

    React tries to render Dashboard
            ↓
    lazy() executes import()
            ↓
    Browser downloads dashboard.js
            ↓
    Promise pending
            ↓
    Suspense renders fallback
            ↓
    Promise resolves
            ↓
    React renders Dashboard

---

# 5. Build Time vs Runtime

## Build Time

    lazy(() => import("./Dashboard"))

    ↓

    Bundler

    ↓

    main.js
    dashboard.js
    settings.js

## Runtime

    User opens Home

    ↓

    main.js downloaded

    ↓

    Dashboard NOT downloaded

    ↓

    User clicks Dashboard

    ↓

    dashboard.js downloaded

    ↓

    Dashboard rendered

---

# 6. What does lazy() do?

```jsx
const Dashboard = lazy(() => import("./Dashboard"));
```

React stores a way to load the component.

It does NOT immediately download it.

---

# 7. What does import() return?

    import("./Dashboard")

returns

    Promise

not the component.

---

# 8. Why Suspense?

React cannot render a pending Promise.

So Suspense provides a fallback UI.

```jsx
<Suspense fallback={<Loading />}>
  <Dashboard />
</Suspense>
```

Timeline:

    Promise pending

    ↓

    Loading...

    ↓

    Promise resolved

    ↓

    Dashboard rendered

---

# 9. Mental Model

Think of Suspense as:

    try {

        render Dashboard

    }

    catch(Promise) {

        render fallback

    }

(Not actual implementation, but a useful mental model.)

---

# 10. Caching

## First Click

    download dashboard.js

    ↓

    execute module

    ↓

    cache module

## Second Click

    no network request

    no module execution

    render immediately

---

# 11. Two Types of Cache

## Browser Cache

Prevents downloading the same JS file again.

## ES Module Cache

Prevents executing the module again.

Future import() calls return the cached module.

---

# 12. Multiple Lazy Components

    <Dashboard />
    <Dashboard />

Question:

Will dashboard.js download twice?

Answer:

No.

Both share the same Promise/module.

Only one network request happens.

---

# 13. Practical Project

Created:

    src/

    App.jsx

    components/
        Navbar.jsx

    pages/
        Home.jsx
        Dashboard.jsx
        Settings.jsx

Converted

    import Dashboard

to

    lazy(() => import("./Dashboard"))

Wrapped Routes with

    <Suspense fallback={<Loading />} />

Observed Network tab.

---

# 14. What We Verified

✅ Dashboard chunk not downloaded initially

✅ Dashboard chunk downloaded on first click

✅ Suspense shows fallback

✅ Dashboard renders after Promise resolves

✅ Second click uses cache

---

# 15. Next.js

Next.js automatically performs route-level code splitting.

    app/

    page.tsx

    dashboard/page.tsx

    settings/page.tsx

Each route gets its own bundle.

Usually no need for React.lazy() on pages.

Use dynamic() for heavy components inside a page.

---

# 16. Waterfall Problem

Bad

    Download JS

    ↓

    Render

    ↓

    Fetch API

    ↓

    Display

Better

    Download JS  ──────┐

    Fetch API    ──────┘

    ↓

    Render

Avoid sequential waits.

---

# 17. Frequently Asked Questions

## Q. Does React download the page separately?

React triggers dynamic import().

The browser downloads the chunk created by the bundler.

---

## Q. Does code splitting happen first or lazy loading?

Code splitting:

Build time.

Lazy loading:

Runtime.

---

## Q. Does lazy loading happen every click?

No.

Only the first time.

Future renders use cached module.

---

## Q. Who downloads the file?

Browser.

React executes import().

The bundler runtime knows where the chunk is located.

---

## Q. Why do we need Suspense?

Because lazy components return a pending Promise while downloading.

---

# 18. Interview Questions

### What is code splitting?

Breaking a large JS bundle into smaller chunks.

---

### What is lazy loading?

Loading chunks only when needed.

---

### Difference?

Code splitting creates chunks.

Lazy loading decides when to load them.

---

### Why Suspense?

Shows fallback while lazy component is loading.

---

### What does import() return?

Promise.

---

### Does React.lazy() create chunks?

No.

The bundler creates chunks.

React.lazy() uses dynamic import() to load them.

---

### What happens on second navigation?

Browser + ES module cache are used.

No additional download.

---

# 19. Self Test

1.  Does lazy() download immediately?

2.  Build time vs runtime?

3.  What returns a Promise?

4.  Why is Suspense needed?

5.  What cache prevents second download?

6.  What cache prevents second execution?

7.  Who creates chunks?

8.  Who downloads chunks?

9.  Difference between static import and dynamic import?

10. Explain the entire lifecycle from click to render.

---

# 20. One-Line Summary

    Dynamic import()

    ↓

    Bundler creates separate chunk (build time)

    ↓

    React.lazy() triggers import() (runtime)

    ↓

    Browser downloads chunk

    ↓

    Promise pending

    ↓

    Suspense renders fallback

    ↓

    Promise resolves

    ↓

    React re-renders

    ↓

    Module cached

    ↓

    Future renders are instant

---

# Final Interview Answer

> Code splitting is a build-time optimization where the bundler creates
> separate JavaScript chunks using dynamic imports. Lazy loading is the
> runtime behavior of loading those chunks only when React first renders
> the component. React.lazy() wraps a dynamic import, which returns a
> Promise, and Suspense displays a fallback UI while the Promise is
> pending. Once resolved, React renders the component and future renders
> use the cached module without additional downloads.
