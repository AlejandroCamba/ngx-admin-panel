---
title: State
category: II. Core
order: 2
---

As admin panels rarely have deep nested states, i implemented an inmutable state from the childs up to the parents, meaning that each child can access the parent's state but not change it, this encourages having more pure-like components or dumb, rather than a lot of smart components.