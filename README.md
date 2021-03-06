# auto-screeenshot-next

Web 制作現場で見た目の確認を素早くおこなうために開発した、複数サイズのスクリーンショットの撮影&保存を一括でおこなうアプリです。
撮影条件(px,url など)が保存可能なため毎回入力する必要がありません。

| 使用技術 | ディレクトリ (Typescript) |
| -------- | ------------------------- |
| Next.js  | `/renderer`               |
| Electron | `/electron-src`           |

## 使い方

- ターミナルで以下のコマンドを実行

```bash
1. yarn install
2. yarn dev
```

上記コマンド実行後のフローは添付の gif 参照

![screenshot](https://user-images.githubusercontent.com/49956319/168489017-90f1e70c-d917-43a8-b00b-7d8ebd1ed165.gif)

## Note

画像の保存先はダウンロードディレクトリに固定されています。

## 未対応部分(今後やりたいこと)

- tsconfig の baseurl 対応
- 撮影中に表示させるスピナーをプログレスバーに変更(進捗のわかるように)
- デザインをカッコ良くする
