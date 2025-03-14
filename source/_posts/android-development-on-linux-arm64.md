---
title: 🤖 在 ARM64 Linux 上配置安卓开发环境
date: 2025-03-14 22:28:08
tags:
- Linux
- 安卓
category: 编程
references:
- title: 'Does an Android Studio Linux arm64 version exist? - Stack Overflow'
  url: 'https://stackoverflow.com/questions/71067886/does-an-android-studio-linux-arm64-version-exist'
- title: 'Now in Android #15 (封面来源)'
  url: 'https://medium.com/androiddevelopers/now-in-android-15-44bf3307a8f2'
cover: 'https://imgsrc.chyk.ink/0Bpu19KuYdBDygxA.webp'
---

已经 {% mark color:red 5202 %} 年了，谷歌官方还未提供 ARM64 Linux 平台上的 {%mark color:green Android Studio %} 及完整工具链支持。本文将分享一种非官方配置方案，助你在 Linux ARM64 系统中搭建可用的基础开发环境。

<!--more-->

## 🛠️ 安装 IDE

#### 方法一：替换 JVM 运行

{%mark color:green Android Studio %} 是谷歌官方的安卓集成开发环境，它基于 {%mark color:purple Intellij IDEA %}，使用 Java 所开发。Java 的特点是「一次编写，到处运行」，因此只要把从官网下载的 x86_64 {%mark color:green Android Studio %} 中的 JVM 替换为 arm64 的即可。

1. 从[官网](https://developer.android.com/studio)下载 x86_64 版 {%mark color:green Android Studio %}。

2. 替换 JVM 运行时：

  - 删除安装目录下的 `jbr` 文件夹；
  - 从 [JetBrains Runtime 仓库](https://github.com/JetBrains/JetBrainsRuntime)下载 `linux-aarch64` 版本 JBR；
  - 解压并重命名为 `jbr` 放置到原目录。

3. 通过终端执行启动脚本：

   > ⚠️ 注意：{%mark color:green Android Studio %} 的主程序 `studio` 是 x86_64 架构的二进制文件，无法在 ARM64 系统上直接启动。因此，需要运行不区分架构的 `studio.sh` 脚本。

   ```
   ./bin/studio.sh
   ```

#### 方法二：{%mark color:purple Intellij IDEA %} + 插件

如果你不想替换 JVM，或者只想使用发行版的打包，也可以直接安装原生支持 ARM64 的 [{%mark color:purple Intellij IDEA %}](https://www.jetbrains.com/idea/)，并通过插件市场安装 [安卓开发插件](https://plugins.jetbrains.com/plugin/22989-android)。

## ⚙️ 配置 SDK

在 IDE 配置完毕后，你可能会遇到一个问题：在 SDK 管理器里下载的安卓 SDK 中似乎包含 x86_64 的东西，根本没办法编译运行任何项目！

这是因为安卓 SDK 中的部分工具（如 `platform-tools`、`build-tools`、NDK、模拟器等）包含了 x86_64 架构的二进制文件。为了解决这个问题，我们需要替换掉这些 x86_64 的二进制文件。

#### 替换工具链

- **平台工具和构建工具**：在 [android-sdk-tools 仓库](https://github.com/lzhiyong/android-sdk-tools/releases) 下载预编译的 ARM64 版本，解压二进制并逐一替换 x86_64 版本。
- **模拟器**：可以使用 [Waydroid](https://waydro.id) 或直接使用安卓真机调试。
- **NDK**：目前，NDK 根本就**不支持** Linux ARM64，而且相关支持已经[四年没有进展](https://groups.google.com/g/android-ndk/c/iV9-87oeo2E)。

#### 配置 Gradle 构建设置

在替换好平台工具和构建工具之后，还需要编辑你项目的 `gradle.properties`，加入一行：

```ini
android.aapt2FromMavenOverride=/path/to/your/aapt2
```

这将确保构建工具使用你手动下载的 ARM64 版本 `aapt2`，而不是从谷歌的 Maven 仓库下载 x86_64 版本。

---

通过以上折腾，你应该能够成功开发纯 JVM 的安卓项目。如果项目涉及原生代码，则可能需要用 `qemu-user` 去跑 x86_64 的 NDK ...  光是想想就很灾难。

随着安卓 15 中 Linux 开发环境的加入，谷歌很可能在几年内拾起对 ARM64 Linux 的支持，相信随着 ARM 生态的蓬勃发展，安卓开发的未来必将跨越架构的藩篱，在让开发者更多设备上绽放创造力。