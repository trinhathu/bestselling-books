# Bestselling Books

[View Site](https://bestselling-books-data.netlify.app/)

This project provides visualizations to explore the [Amazon Top 50 Bestselling Books 2009 - 2019](https://www.kaggle.com/datasets/sootersaalu/amazon-top-50-bestselling-books-2009-2019) dataset.

## Developing Locally

1. Clone this repository, then run `npm install` in its root directory.

2. Run the Next.js development server with:

```
npm run dev
```

If your browser doesn't navigate to the site automatically, visit [localhost:3000](http://localhost:3000).

## Project Structure

## TODOs & Next Ups

- animations
- improve existing visualizations
  - title: better year slider
  - wordcloud: add tooltip
  - better responsiveness, esp small screens
- extend table sorting:
  - support sorting by multiple columns
  - add filtering
- other interesting ways to slice the data
  - bestsellers by price
  - ratings & reviews
- clean the data
- more defensive code, checks around data
- cache

## ADRs

- why Next.js, Tailwind
- why Visx

## Production Readiness Checklist

- tests
- scaling
- cdn
- caching
- logging, error handling
- monitoring, alerting
- tracking
- troubleshoot handbook
