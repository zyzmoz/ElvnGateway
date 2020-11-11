## ElvnGateway

Gateway with dynamic routing for HTTP and WebSockets.

### System Routes
The root route is responsible by operational actions such as create, update and delete routes.

##### Route format:

 ```javascript 
    {
        id: number,    
        url: string,
        target: string,
        webSocket: boolean,
        ignoreBasePath: booleans
    }
```

##### Routes Definition

| Route        | Method           | Description  |
| ------------- |:-------------:| :-----|
| /      | GET | Returns all routes  |
| /:id     | GET      | Returns route with a given id |
| / | POST      | Create a new route |
| /:id | POST      | Update a route with a given id |
| /:id | DELETE      | Delete a route with a given id |

###### Attention:
The **/ui** route is reserved and it can be used to implement a page to manage all routes in a visual way.

### [WIP]
|Status|Description|
|:-----|:----------|
|Queued| HTTPS support |
