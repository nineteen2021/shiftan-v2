# Shiftan（シフト管理業務補助アプリ）
![image](https://user-images.githubusercontent.com/84577532/202179477-766ef36e-3463-4b27-80a9-fb481b0198c9.png)
技育展登壇用スライド: https://docs.google.com/presentation/d/1Akfkf7ZtehgYBxIZ36l0LURtK4Hk89z9VLFWCwWnZ6Q/edit#slide=id.g13cf339ed51_2_72  

## 概要
Shiftanは飲食店等のシフト管理業務を補助するwebアプリです。  
もともと知人のアルバイト先の店長がシフトの作成に1週間かかっているという課題があり、それを解決するために開発を行っています。
その中で[しふたん（自動シフト表作成アプリ）](https://github.com/JinA293/shiftan)を開発しましたが、店舗に導入できず課題の解決に至らなかったためにもう一度チームでShiftanの開発を始めました。
#### 開発期間・人数
開発期間:9か月（2022/2-2022/11)  
開発人数:5人（エンジニア:4人, デザイナー:1人）  
- [＠JinA293](https://github.com/JinA293) 
- [@KaedeNozawa](https://github.com/KaedeNozawa)
- [＠koki-fore](https://github.com/koki-fore)
- [＠yamato3010](https://github.com/yamato3010)  
（アルファベット順）

## 使用技術
![image](https://user-images.githubusercontent.com/84577532/202180920-0258aac5-38fb-40ab-a738-dd39cb4421e5.png)
#### Front : JavaScript(React), HTML/CSS, MaterialUI  
#### Back : Python(Django)  
#### DB : MySQL  
#### TaskManagement : Trello, Miro etc.  
### ER図
![image](https://user-images.githubusercontent.com/84577532/202622388-ba393a81-4821-4919-9afb-1c21bee81040.png)

## どのように動くか
### どちらのアカウントでも使える機能
- シフト一覧閲覧
- アカウント編集（パスワード変更などを含む）

### 店舗マネージャーアカウントでのみ使える機能
- シフト編集
- シフト作成
- スタッフのポジション編集

### 店舗スタッフアカウントのみ使える機能
- 希望シフト提出

## 困難だった点とどう乗り越えたか

## 改善点
