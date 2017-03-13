[<img src="./assets/images/0SquadLogo.png"/>](https://github.com/0Squad)

# 0Squad Merch
An E-Commerce app that allows users to purchase our squad's merchandise.

- [Visit our website!](https://0squad.github.io/0squadmerch/)
- [Back-end Repo](https://github.com/0Squad/0squadmerch-api)
- [Link to wireframes](https://goo.gl/photos/si3vrGCq6B87UXFg8)
- [ERD](https://goo.gl/photos/BaErscbjzTdedkC69)

## Dependencies

Install with `npm install`.

-   [Webpack](https://webpack.github.io)
-   [Bootstrap](http://getbootstrap.com)
-   [Handlebars.js](http://handlebarsjs.com)
-   [`stripe`](https://stripe.com/blog/official-nodejs-support)

## Installation

1.  Fork and clone this repository.
1.  Install dependencies with `npm install`.

## Approach and team process

We began our process by discussing how exactly we wanted to structure our website-- which parts would use the API, how much we wanted the front end to do, etc. As discussed on our [back-end repo](https://github.com/0Squad/0squadmerch-api), we did not code separately for the first two days. This allowed us to have enough knowledge about both the front-end and the back-end to begin splitting off on the third day. Each morning during our stand-up we would talk about our schedule and goals we wanted to hit for the day. Typically we had one goal to hit by lunch and one to hit by the end of the day. We agreed to leave GA by 7:00pm at the latest every day, ensuring that each member stayed alert and did not lose sleep over the project. This allowed us to work efficiently during project hours.

In terms of work flow and structure, we utilized our internal issue queue and projects tab on GitHub. We mainly filed issues as "notes to self" before we hit requirements. The projects tab was especially helpful towards the end of the project, as we would discover bugs before leaving one night. We were able to mimic a Trello board and save notes of our bugs in a "TO-DO" column and move them to a "COMPLETED" column as we fixed each bug.

## Limitations and Complications

Initially, we wanted our *DELETE* function to delete an item from the order each time someone removes a product. However, we quickly realized that *DELETE* would delete the entire order, so we would have to constantly *POST* every time we did that. After a group discussion, we decided it would be DRYer to have our *POST* happen on "checkout" rather than on "add to cart". This allowed us to separate concerns and not rely on a single button to do *POST*, *PATCH*, and *DELETE* depending on a given situation.
We redefined our *DELETE* function to be an option for users if they wanted to delete an old order from their order history.

We also had a discussion about *PATCH* in regards to when a user clicks "checkout" but changes their mind before paying. We edited the back-end `update` controller function to mimic `create` to add flexibility with our checkout.

The final day we spent on final touches and debugging. This gave us time to break our app and edit out any errors we missed earlier in the week. We found that `onCreateCharge` was reflecting the wrong price in a scenario when a customer checks out, changes their mind, changes the quantity, and tries to check out again. Essentially, it was having the same effect as

```javascript
let i = 0;
i++;
// returns 0
i;
// returns 1
```

We edited our cart to be an object with item properties instead of simply an empty array. This allowed us to call properties in the cart object rather than some arbitrary array. Basically, by fixing the total to be edited on the client-side, we fixed the issue.

## Connecting to the back-end

Our front-end saves a user's cart locally, so the order does not actually get created until the user decides to check out. When this happens, our app sends a *POST* request using the stored items in the local cart as our items array, with a completed status as `false`. The `onCreateOrder` function actually checks for an id before posting, so if an id exists in the cart, it will send a *PATCH* request instead of a *POST* request.
When a user decides to pay, our `onCreateCharge` function sends a *POST* request for the charge token. Once the order has been successfully paid, our app sends a *PATCH* request updating the order's completed status as `true`. It also clears the cart and resets the cart's order id back to an empty string, so it will never create a charge on a completed and already-paid-for order.

## Notes on Stripe

For testing, Stripe provided a fake credit card.
`4242 4242 4242 4242` works with any future expiration date and CVC.

## Future goals

We would like to be able to see products and add to cart before signing in. If a user tries to purchase an item before signing in, the app would make them create an account/sign in. We also defined some reach goals in our user stories.

## User Stories:
### Users can:
- Create account
- Sign in
- Change password
- See all products
- Select one product
- Add products to cart
- See cart
- Edit/ delete items in cart
- Purchase items
- See order history
- Sign out

### Users canNOT:
- See other users’ carts
- Add things to other users’ carts
- Purchase stuff under other users
- Create items

### Reach goals:
- Users can search for a specific item
- Users can recreate past orders
- Users can favorite an item
- Users can comment/review an item
- Users can share an item to social media
- Users can NOT enter a fake email address

### Technologies used:
- JavaScript
- HTML/SCSS
- Bootstrap
- Handlebars
- jQuery
- [Stripe](https://stripe.com/)
- Amazon S3
