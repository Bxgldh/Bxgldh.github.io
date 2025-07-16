---
title: Github使用
published: 2025-07-08
description: Some notes about Github
tags: [Git]
category: Github
draft: false
---

## Push本地项目到github仓库
```cmd
cd my-project
git init
git add .
git commit -m "First commit"
git remote add origin git@github.com:yourname/repo.git
git branch -M main
git push -u origin main
```

