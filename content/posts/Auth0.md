---
title: "Auth0 Implementation inside the node js "
slug: "auth0-implementation"
date: "2025-08-06"
---
##  Step 1: Create Custom Hook

At first, create a file:  
`src/auth/auth.tsx`

Now write the following code inside it:

```tsx
import { useAuth0 } from "@auth0/auth0-react";

const useGetToken = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getToken = async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_API_AUDIENCE,
        },
      });
      console.log("Access Token:", token);
      return token;
    } catch (err) {
      console.error("Failed to get token", err);
    }
  };

  return getToken;
};

export default useGetToken;
```

---

## Explanation

- First, we import `useAuth0` from `@auth0/auth0-react`.

- This is a `.tsx` file and we're using **React hooks**.

- Create a main hook function called `useGetToken`.


### Inside the function:

1. **Initialize** `getAccessTokenSilently` from the Auth0 hook.

2. Create an **async function** `getToken`.

3. Inside `getToken`, call `getAccessTokenSilently` with `authorizationParams` and provide the **audience** from `env`.

4. **Log the token** to the console to check if it’s working.

5. **Return the token** from the function.

6. Finally, return the `getToken` function itself from the hook.


---

##  Usage Example

Now in any component where you need the token:

```tsx
import useGetToken from "../auth/auth";

const Foo = () => {
  const getToken = useGetToken();

  const fetchData = async () => {
    const token = await getToken();
    // Use token in headers, etc
  };

  return <button onClick={fetchData}>Fetch Data</button>;
};
```

## Explanation
 Import the **useGetToken** Hook from `.tsx`.  
 
 Inside the `Foo` function use the  `useGetToken` Hook to get the access Token inside the Foo component.
  
  While fetching the data use `GetToken()` function to get the Access token then validate the fetch process from that token. 

