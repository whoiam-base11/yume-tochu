# インタビューデータの一括登録

- 入力形式：`template.csv` の列名に合わせたUTF-8のCSV。1行につき1インタビュー。
- CSV保存先：`interviews.csv`。
- 画像保存先：`images/`。`imageFile` 列に拡張子付きのファイル名を記入する。
- `SpotifyLink`：各インタビューのSpotify URL。任意項目。
- `accentColor`：指定があればその色を使用する。空欄の場合は登録データ作成時に以下の12色からランダムに割り当て、生成データに保存する。同じ生成データの再登録時は色を変えない。
  - red, orange, amber, gold, blue, sky, navy, purple, pink, teal, tan, rose
- `sourceId`：重複しない固定の管理番号。
- `SpotifyLink`（または`Spotify リンク`）はSanityの`spotifyLink`に保存する。
- `sourceID`も`sourceId`として読み込む。カテゴリは小文字に正規化し、画像の拡張子省略は対応ファイルから解決する。表示順が空欄の場合はCSVの行順を使用する。

## 実行

1. `node --env-file=.env.local migration/interviews/inspect.mjs`：既存エピソードを`before-import.json`にバックアップする。削除対象を確認する。
2. `python3 migration/interviews/prepare.py`：CSVと画像を検証し、ID・ランダム色を固定した`prepared.json`を作成する。
3. `node --env-file=.env.local migration/interviews/import.mjs`：画像をアップロード後、バックアップしたエピソードの削除と新規登録を一つのトランザクションで実行する。公開済みとして登録する。

インポートは明示的なデータ入れ替え用。`before-import.json`を再取得すると削除対象が変わるため注意。生成ファイルを維持したまま再実行した場合は同じID・色を使用し、既存の登録済みドキュメントは上書きしない。登録後は全フィールド、件数、画像参照を照合し、`report.json`に記録する。バックアップには画像アセット本体は含まれないが、この処理では既存アセットを削除しない。
