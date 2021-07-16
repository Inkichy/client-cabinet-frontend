# QBFFinance

Личный кабинет QB Finance

## Режим разработчика

`npm install && npm start`

Управление ендпойнтами API производится в **proxyconfig.sjon**

## Для ознакомления

##### Стили Личного кабинета
`Путь - src/assets/css`

##### JS файлы
`Путь - src/assets/js`

##### Изображения
`Путь - src/assets/images`

##### Библиотеки
`Путь - src/assets/libs`

## Генерация новой страницы

##### Генерация модуля страницы
`ng g module pages/main`
где main название страницы

##### Генерация компонента страницы
`ng g component pages/main`
где main название страницы


## Генерация UI компонентов

##### Генерация модуля страницы

module-name и component-name всегда одинаковые

`ng g module ui/module-name`
где main название страницы

##### Генерация компонента страницы

`ng g component ui/component-name`

где main название страницы

После генерации в модуле компонента обязательно добавить секцию export с названием компонента

```
@NgModule({
  declarations: [LogoComponent],
  exports: [LogoComponent],
  imports: [
    CommonModule
  ]
})
```

После того как сделали модуль компонента его нужно подключить на нужной странице или в нужном зависимом компоненте. Это делается через секцию import модуля

Вот пример подключения модулей на странице main
```
@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    FilterModule, <---
    HeaderModule, <---
    FooterModule, <---
  ]
})
```

# Build prod

```
docker build -t qb-angular:prod . && docker run -p 80:80 qb-angular:prod
```# client-cabinet-frontend
