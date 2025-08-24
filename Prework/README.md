# WEB103 Prework - *Creatorverse*

Submitted by: **Abdessamad Ballaj**

About this web app: **A React + Supabase CRUD app for discovering podcasts and YouTube creators (public influencers).**

Time spent: **25** hours

## Required Features

The following **required** functionality is completed:

- [x] **A logical component structure in React is used to create the frontend of the app**
- [x] **At least five content creators are displayed on the homepage of the app**
- [x] **Each content creator item includes their name, a link to their channel/page, and a short description of their content**
- [x] **API calls use the async/await design pattern via Axios or fetch()**
- [x] **Clicking on a content creator item takes the user to their details page, which includes their name, url, and description**
- [x] **Each content creator has their own unique URL**
- [x] **The user can edit a content creator to change their name, url, or description**
- [x] **The user can delete a content creator**
- [x] **The user can add a new content creator by entering a name, url, or description and then it is displayed on the homepage**

## Optional Features

- [ ] Picocss is used to style HTML elements
- [x] The content creator items are displayed in a creative format, like cards instead of a list
- [x] An image of each content creator is shown on their content creator card

## Additional Features

- TailwindCSS design system (buttons, cards, inputs), responsive layout
- Hero banner with featured image on the homepage
- Loading skeletons and error states on list/detail pages
- Social links (YouTube, Twitter, Instagram) fields
- React Router v7 future flags enabled to silence warnings
- Placeholder SVG asset for thumbnails

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='public/assets/walkthrough.gif' title='Video Walkthrough' alt='Video Walkthrough' />


GIF created with **Peek**

## Notes

- Seed at least five rows using `supabase/seed_creators.sql` or call `seedIfEmpty()` to satisfy the homepage count.

## License

Copyright 2025 Abdessamad Ballaj

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.