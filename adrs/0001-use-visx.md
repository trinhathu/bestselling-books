# 0001. Use Visx

**Date:** 2024-04-17

**Status:** Accepted

## Context

The goal of our project is to build a web app that presents a dataset in interesting ways.

The team working on the project consists of 1 lone engineer who hasn't worked on data visualization in a few years and only has 5 hours to build something presentable.

Therefore, the team is looking for a popular (well-supported) React-based visualization library to aid in building out standard visualizations (such as line or bar charts) and some out-of-the box visualizations as well.

## Decision

Use [Visx](https://airbnb.io/visx/), a library built by Airbnb that describes itself as a "collection of expressive, low-level visualization primitives."

In addition to its set of core primitives, Visx also includes many utilities to help build visualizations, and allows users to pick and choose the components that they need.

## Consequences

Since Visx consists of low-level primitives, it does take a bit more code to get a sensible chart on the screen. Other libraries make this task as easy as rendering a few components and passing in props. Visx also doesn't come with eye-catching animations, sadly.

Visx makes up for it in terms of its clear documentation and examples for how to use its components in a variety of different ways. And because it's so barebones, we can iteratively add custom theming, animations, and more charts, or even create our own charting libraries on top of it as we grow and expand our web app.

## Alternatives Considered

### [Victory](https://commerce.nearform.com/open-source/victory/gallery)

Has beautiful animations and examples for custom charts, but lacks some of the charting options, such as a word cloud, that Visx offers.

### [Recharts](https://recharts.org/en-US)

Many different charting options and examples, but the documentation doesn't have a lot of examples on building custom charts.
