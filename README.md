<h1 align="center"> litmd </h1>
<p align="center">Markdown による文芸的プログラミング</p>

## litmd について

litmd はソフトウェアのドキュメント作成とプログラミングを単一のマークダウンコードで行えるツールです。

[プレイグラウンド](https://hota1024.github.io/litmd/play)

## インストール方法

```shell
npm install -g @hota1024/litmd
```

## 使用例

### 例1：hello, world

`hello.md` を作成し以下のようなコードを記述する。

~~~md
# hello, world

- `console.log` を用いて `"hello, world"` を出力する。

```js
console.log("hello, world")
```
~~~

ターミナル上で `litmd run` コマンドを実行する。引数には先程の `hello.md` のパスを指定する。

```shell
$ litmd run hello.md
hello, world
```

### 例2：エラトステネスのふるい

~~~markdown
# Prime Numbers CLI

## Shebang

```js
#! /usr/bin/env node
```

## Arguments

- `N` : Maximum number to check for prime numbers.

```js
const N = parseInt(process.argv[1]);
```

## Sieve of Eratosthenes

### Prepare

- Create an array of `N` elements.

```js
const primes = Array(N + 1).fill(true);
```

### Step 1. Mark multiples of 2

- Start from `2` and mark all multiples of `2` as `false`.

```js
for (let i = 2; i * i <= N; i++) {
  if (primes[i]) {
    for (let j = i * i; j <= N; j += i) {
      primes[j] = false;
    }
  }
}
```

### Step 2. Print prime numbers

- Print all prime numbers.

```js
const results = [];
for (let i = 2; i <= N; i++) {
  if (primes[i]) {
    results.push(i);
  }
}
alert(results.join("\n"));
```
~~~

## リファレンス

litmd は Markdown 中のコードブロックを連結したコードを実行します。litmd は現在 JavaScript（Node.js）のみサポートしています。　コードブロックの言語には `js` もしくは `javascript` を指定してください。

### コメント

見出しテキストの先頭に `#` を付与することで、その見出し直下のコードブロックは出力コードに含まれなくなります。

~~~markdown
# ここのコードブロックは出力される

```js
console.log("Hello!");
```

# # ここのコードブロックは出力されない
  ↑ 先頭に # を付けることで↓のコードは出力されなくなる。

```shell
$ litmd hello.md
```
~~~
