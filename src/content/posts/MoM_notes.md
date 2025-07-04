---
title: Mixture of Memories
published: 2025-07-04
description: Some notes about MoM & lolcats
tags: [MoM, Linear attention]
category: LLM
draft: false
---

Github Source: [OpenSparseLLMs
MoM](https://github.com/OpenSparseLLMs/MoM)

Paper Source: [MoM: Linear Sequence Modeling with Mixture-of-Memories
](https://arxiv.org/pdf/2502.13685)

# Introduction
This blog is to record my learning route of LLM

# Model Structure
![Model Structure](MoM_notes/mom_fig1.png)

总的来说，MoM模型的思想是通过一个Router来对本地的K、V进行