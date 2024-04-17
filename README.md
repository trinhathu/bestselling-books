# Bestselling Books

[View Site](https://bestselling-books-data.netlify.app/)

This project provides visualizations to explore the [Amazon Top 50 Bestselling Books 2009 - 2019](https://www.kaggle.com/datasets/sootersaalu/amazon-top-50-bestselling-books-2009-2019) dataset.

## Developing Locally

1.  Clone this repository, then run `npm install` in its root directory.

1.  Run the Next.js development server with:

        npm run dev

If your browser doesn't navigate to the site automatically, visit [localhost:3000](http://localhost:3000).

You can build the site locally by running: `npm run build`

This project automatically builds and deploys to Netlify on merges to main.

1.  To develop locally with full Netlify functionality, first install the Netlify CLI:

        npm install netlify-cli@latest -g

1.  Link your local repository to the deployed Netlify site. This will ensure you're using the same runtime version for both local development and your deployed site.

        netlify link

1.  Then, run the Next.js development server via Netlify CLI:

        netlify dev

If your browser doesn't navigate to the site automatically, visit [localhost:8888](http://localhost:8888).

## Project Structure

This project follows a typical Next.js project structure.

Routes are defined under `/app`, with the folder names making up the route name, and `page.tsx` defining the public accessible page. We also use `page.tsx` to handle our data fetching. See Next.js documentation on [Pages and Layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts) for more details.

Shared components can be found under `/components`, and shared constants and types live under `/shared`.

## TODOs, Next Ups, Ideas

- Animations make everything better
- Improve existing visualizations
  - Title: make a prettier year slider
  - Wordcloud: add tooltip on hover that shows books with that word in the title
  - All: better responsiveness, especially for small screens (e.g., ensure labels and tooltips aren't squished)
- Extend table sorting:
  - Support sorting by multiple columns
  - Add filtering (e.g., filter by genre)
  - Format data (e.g., numbers)
  - Reduce layout shifts when sorting (fixed width columns?)
- Slice the data in other ways
  - By price
  - By ratings & reviews
- Clean the data (or otherwise handle cases like "J. K. Rowling" and "J.K. Rowling")
- More defensive code, checks around data, handle empty arrays
- Cache as much as possible / identify performance optimizations
- Add tracking so we know which parts interest people
- Internationalization
- A better layout...

## ADRs

- [ADR-0001: Use Visx](adrs/0001-use-visx.md)

I'm a fan of using architectural decision records (ADRs) as a way of keeping track of architecture choices.

In the real world, if the standard for a company is to create web apps in Next.js and Typescript, I probably wouldn't write an ADR when I create a new app using those technologies. However, if the standard is Next.js and we use Vue.js instead, that's when I would write the ADR.

For the sake of time, which I'm rapidly running low on, here are some quick summaries of decisions that could potentially be ADRs:

- Use Netlify
  - I've used it before and it's free.
- Use Next.js
  - Habit, but it's also a very powerful framework and I like it. Plus, Netlify has a starter template that uses it.
- Use Typescript
  - Even if you hadn't said it was preferred, I would have used Typescript because I prefer it myself. Typescript makes it really clear what kind of data you're working with at any given time, and it makes React prop types a whole lot nicer.
- Use Tailwind CSS
  - While I like writing CSS, I didn't want to spend my limited time writing it. I wanted to use a framework to speed up my time to get something presentable on the page, and the Netlify starter template included it. I hadn't used Tailwind before (I've used Material UI more often), but I wanted to try it, and it was indeed east to get started.
- Build a sortable table component
  - Why build when there are so many pre-built libraries and solutions for this use case? Mostly to showcase how I would approach writing a reusable component and demo more state management.

## Production Readiness Checklist

- [ ] Add tests!
- [ ] Run an accessibility audit
- [ ] Test in diffent browsers, platforms, screens
- [ ] Add logging and monitoring
- [ ] Determine any SLAs/SLOs/SLIs
- [ ] Add alerting based on the above
- [ ] Write a troubleshooting handbook for when incidents arise
- [ ] Ensure [ chosen cloud service provider ] is configured to scale properly
