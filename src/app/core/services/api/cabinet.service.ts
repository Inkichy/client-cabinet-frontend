import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import {
  CabinetDataModel,
  CabinetPortfolioModel,
  CabinetUserPortfolioModel,
  RatesModel
} from '../../models/cabinet-data.model';

@Injectable({
  providedIn: 'root',
})
export class CabinetService extends ApiService {
  public dataLoaded = false;
  public popUpShow = false;

  dataSubject: BehaviorSubject<CabinetDataModel> = new BehaviorSubject(null);
  isShownAlert = false;

  constructor(protected http: HttpClient) {
    super(http);
    if (localStorage.getItem('client')) {
      this.popUpShow = true;
      this.dataSubject.next(JSON.parse(localStorage.getItem('client')));
    }
  }

  notEmpty(data): boolean {
    return data !== null;
  }

  /**
   * Получение данных для кабинета пользователя
   */
  getData() {
    return this.http.post<CabinetDataModel>(this.getApiUrl('cabinet/get-cabinet-data'), {}).pipe(map(_ => {
      _.portfolios.map(elem => {
        if (elem.TARIFS === null) {
          elem.TARIFS = "";
        } else {
          elem.TARIFS = elem.TARIFS[0];
        }
      });
      this.dataSubject.next(_);
      localStorage.setItem('client', JSON.stringify(_));
      this.dataLoaded = true;
      this.popUpShow = true;
    }));
  }

  getDataObservable(): Observable<CabinetDataModel> {
    return this.dataSubject.asObservable();
  }

  public uploadFile(formData: FormData) {
    return this.http.post(this.getApiUrl('cabinet/uploadFile'), formData);
  }

  public getFistQuestion() {
    return this.http.get(this.getApiUrl('cabinet/pick-up-products'));
  }

  public sendAnswer(answersObject) {
    return this.http.post(this.getApiUrl('cabinet/pick-up-products'), answersObject);
  }
  /**
   * Отправка запроса на покупку продукта
   */
  sendPurchaseRequest(product: number) {
    const productID = { product_id: product };
    return this.http.post(this.getApiUrl('cabinet/sendEmailWithProduct'), productID);
  }
  /**
   * Получение элемента портфолио главной страницы
   */
  getNewStrategy() {
    return this
      .dataSubject
      .pipe(
        filter(this.notEmpty),
        map(data => {
          const result = data.portfolios.filter(item => item.SHOW_MAIN === true && item.ITEM_TYPE === 'Доверительное управление');
          return result.length > 0 ? result[0] : null;
        })
      );
  }

  getPortfolio(): Observable<CabinetPortfolioModel[]> {
    return this
      .dataSubject
      .pipe(
        filter(this.notEmpty),
        map(data => {
          const result = data.portfolios;
          return result.length > 0 ? result : null;
        })
      );
  }

  /**
   * Все акции
   */
  getAllStock() {
    return this
      .dataSubject
      .pipe(
        filter((data) => data !== null),
        map((data) => {
          return data.portfolios.filter(item => item.ITEM_TYPE === 'Акции' && item.ACTIVE);
        })
      );
  }

  /**
   * Все облигации
   */
  getAllBond() {
    return this
      .dataSubject
      .pipe(
        filter((data) => data !== null),
        map((data) => {
          return data.portfolios.filter(item => item.ITEM_TYPE === 'Облигации' && item.ACTIVE);
        })
      );
  }


  /**
   * Акция / Облигация  для главной страницы
   */
  getNewStockAndBond() {
    return this
      .dataSubject
      .pipe(
        filter(data => data !== null),
        map(data => {
          const result = data.portfolios.filter(item => (item.ITEM_TYPE === 'Акции' || item.ITEM_TYPE === 'Облигации') && item.new && item.ACTIVE);
          return result.length > 0 ? result[0] : null;
        })
      );
  }


  /**
   * Список стратегий
   */
  getStrategies() {
    return this
      .dataSubject
      .pipe(
        filter(this.notEmpty),
        map(data => {
          return data.strategys;
        })
      );
  }
  /**
   * Получение элемента портфолио для страницы "Доверительное управление"
   */
  getPortfolioWithFilter(strategyId?: any, itemType?: string): Observable<CabinetPortfolioModel[]> {

    return this
      .dataSubject
      .pipe(
        filter(this.notEmpty),
        map(data => {

          let items: CabinetPortfolioModel[] = data
            .portfolios.filter(item => !itemType || item.ITEM_TYPE === itemType && item.ACTIVE)
            .reduce((result, item, index, array) => {
              item.child = [];
              result[item.ID] = item;
              return result;
            }, {}) as CabinetPortfolioModel[];

          for (const key in items) {
            if (items.hasOwnProperty(key)) {
              const parentId = items[key].PARENT_ID;
              const activeProd = items[key].ACTIVE;
              if (parentId) {
                if (items[parentId]) {
                  items[parentId].child.push(items[key]);
                }
                delete items[key];
              }
            }
          }

          items = Object.values(items);

          if (strategyId) {
            items = items.filter((item) => item.strategyId === strategyId);
          }

          return items;
        })
      );
  }

  /**
   * Получение элементов портфолио для страницы "Подобрать продукт"
   */
  getPortfolioByPortfolioId(id: number): Observable<CabinetPortfolioModel> {

    return this
      .dataSubject
      .pipe(
        filter(this.notEmpty),
        map(data => {
          const result = data.portfolios.filter((item) => item.ID === +id);
          return result ? result[0] : null;
        })
      );
  }

  // getRates(): Observable<RatesModel> {
  //   return this
  //     .dataSubject
  //     .pipe(
  //       filter(this.notEmpty),
  //       map(data => data.rates)
  //     );
  // }

  /**
   * Получение элемента портфолио для страницы "Что такое ИИС"
   */
  getPortfolioForIIS(): Observable<CabinetPortfolioModel[]> {
    return this
      .dataSubject
      .pipe(
        filter(data => data !== null),
        map(data => {

          let items: CabinetPortfolioModel[] = data
            .portfolios
            .reduce((result, item, index, array) => {
              item.child = [];
              result[item.ID] = item;
              return result;
            }, {}) as CabinetPortfolioModel[];

          for (const key in items) {
            const parentId = items[key].PARENT_ID;
            if (parentId) {
              if (items[parentId]) {
                items[parentId].child.push(items[key]);
              }
              delete items[key];
            }
          }

          items = Object.values(items);
          items = items.filter((data) => {
            return (data.child && data.child.length);
          });

          return items;
        })
      );
  }

  getPortfolioByParentId(id: any): Observable<CabinetPortfolioModel> {
    return this
      .dataSubject
      .pipe(
        filter(this.notEmpty),
        map(data => {
          const result = data.portfolios.filter((item) => +item.PARENT_ID === id);
          return result ? result[0] : null;
        })
      );
  }

  getPortfolioById(id: any): Observable<CabinetPortfolioModel> {
    return this
      .dataSubject
      .pipe(
        filter(this.notEmpty),
        map(data => {
          const result = data.portfolios.filter((item) => item.ID === id);
          return result ? result[0] : null;
        })
      );
  }

  getTariffForChange(product: CabinetPortfolioModel): Observable<CabinetPortfolioModel> {
    return this
      .dataSubject
      .pipe(
        filter(this.notEmpty),
        map(data => {
          return data.portfolios.filter((item) => item.ID !== product.ID && item.ITEM_TYPE === product.ITEM_TYPE).pop() || null;
        })
      );
  }

  getUserPortfolioByProductId(portfolioId: any): Observable<CabinetUserPortfolioModel> {
    return this
      .dataSubject
      .pipe(
        filter(this.notEmpty),
        map(data => {
          return data.userPortfolios.filter((item) => +item.portfolioId === +portfolioId).pop() || null;
        })
      );
  }

  getUserPortfolioById(id: any): Observable<CabinetUserPortfolioModel> {
      return this
        .dataSubject
        .pipe(
          filter(this.notEmpty),
          map(data => {
            const userProduct = data.userPortfolios.filter((item) => +item.id === +id).pop() || null;
            if (userProduct && userProduct.portfolioId) {
              userProduct.product = data.portfolios.filter(item => item.ID === userProduct.portfolioId).pop();
            }
            return userProduct;
          })
        );
  }

  getPortfolioByFancyId(CONTR: any): Observable<CabinetUserPortfolioModel> {
    return this
      .dataSubject
      .pipe(
        filter(this.notEmpty),
        map(data => {
          const userProduct = data.userPortfolios.filter((item) => +item.CONTR === +CONTR).pop() || null;
          if (userProduct && userProduct.portfolioId) {
            userProduct.product = data.portfolios.filter(item => item.CONTR === userProduct.CONTR).pop();
          }
          return userProduct;
        })
      )
  }

  getUserPortfolioType(type: string): Observable<CabinetUserPortfolioModel[]> {
    return this
      .dataSubject
      .pipe(
        filter(this.notEmpty),
        map(data => {
          const productsId = data.portfolios.filter(_ => _.ITEM_TYPE === type).map(
            _ => +_.id
          );

          return data.userPortfolios.filter((item) => productsId.indexOf(+item.portfolioId) > -1);
        })
      );
  }


  getBalance() {
    // let rates: RatesModel;
    // this.getRates().subscribe((model) => {
    //   rates = model;
    // });

    let sum = 0;

    this.getUserPortfolio().subscribe(items => {
      items.forEach(item => {
        for (const k in item.amount) {
          if (k === 'RUR') {
              sum += +item.amount[k];
          } else {
              sum += +item.amount[k] * item.rates[k];
          }
        }
      });
    });

    return sum;
  }

  getUserPortfolio(): Observable<CabinetUserPortfolioModel[]> {
    return this
      .dataSubject
      .pipe(
        filter(data => data !== null),
        map(data => {
          const portfolios = data.userPortfolios;
          portfolios.map((item, i) => {
            this.getPortfolio().subscribe(
              strategies => {
                strategies = strategies.filter(product => product.ID === +item.portfolioId);
                item.product = strategies.length > 0 ? strategies[0] : null;
              }
            );
          });
          return portfolios;
        })
      );
  }

  getBxIdProductByPortfolioId(portfolioId) {
      return this
          .dataSubject
          .pipe(
              filter(data => data !== null),
              map( data => {
                  const bxId = data.portfolios.filter(_ => _.ID === portfolioId).map(_ => +_.ID);
                  return bxId;
              })
          );
  }


  getMeta(): Observable<any> {
    return this.dataSubject.pipe(
      filter(this.notEmpty),
      map(
        _ => _.meta
      )
    );
  }

  getRequisites(): Observable<any> {
    return this.dataSubject.pipe(
      filter(this.notEmpty),
      map(
        _ => _.requisites
      )
    );
  }

  getRequisitesByCode(code): Observable<any> {
    return this.dataSubject.pipe(
      filter(this.notEmpty),
      map(
        _ => _.requisites.filter(
          item => item.CODE === code
        ).pop()
      )
    );
  }

    getRequisitesByCodeTypeCurrency(code, type, currency): Observable<any> {
        return this.dataSubject.pipe(
            filter(this.notEmpty),
            map(
                _ => _.requisites.filter(
                    item => item.CODE === code
                ).filter(item => item.ITEM_TYPE === type).filter(item => item.CURRENCY === currency).pop()
            )
        );
    }

    isUserHasIIS(): Observable<boolean> {
      let answer = false;
      return this.dataSubject.pipe(
        filter(this.notEmpty),
        map(data => {
          data.userPortfolios.map((item) => {
            this.getPortfolioById(item.portfolioId).subscribe(result => {
              if (result.name.includes('ИИС')) {
                answer = true;
              }
            });
          });
          return answer;
        })
      );
    }


  withdrawSmsRequest(form): Observable<any> {
    return this.http.post(this.getApiUrl('cabinet/withdraw'), form);
  }

  withdrawSmsConfirm(form): Observable<any> {
    return this.http.post(this.getApiUrl('cabinet/withdrawConfirm'), form);
  }

  smsRequest(action: string = ''): Observable<any> {
    return this.http.post(this.getSwaggerUrl('cabinet/sms-request'), {
      action
    });
  }

  // смена пароля из кабинета
  changePassword(password: any) {
    return this.http.post<any>(this.getApiUrl('cabinet/saveNewPassword'), password);
  }

  // отправка кода смс при смене пароля на почту
  changePasswordEmail(password: any) {
    return this.http.post<any>(this.getApiUrl('cabinet/saveNewPassword/email'), password);
  }


  // запрос Смс из кабинета
  forgotSmsConfirm(code: string, hash?) {
    return this.http.post<any>(this.getApiUrl('cabinet/saveNewPassword/sms-confirm'), { code, hash });
  }

  // Повторный запрос СМС
  forgotSmsRequest(hash?) {
    return this.http.post<any>(this.getApiUrl('cabinet/saveNewPassword/sms-request'), { hash });
  }

  ///////////////////////Раздел уведомлений///////////////////////

  checkNewNotices(): Observable<boolean> {
    let answer = false;
    return this.dataSubject.pipe(
      filter(this.notEmpty),
      map(_ => {
        if (_.notification) {
          answer = true;
        }
        return answer;
       }
      ));
  }

  getNoticesYears() {
    let years = [];
    return this.dataSubject.pipe(
      filter(this.notEmpty),
      map(data => {
        let year = data.client.dateCreate .match(/\d{4}/)[0];

        for (let i = +year; i <= new Date().getFullYear(); i++) {
          years.push(i);
        }

        return years;
      })
    );
  }

  getNotices(year) {
    return this.http.post<any>(this.getApiUrl('cabinet/notices/get-all'), {year});
  }

  setViewedNotices(ids): Observable<any> {
    return this.http.post(this.getApiUrl('cabinet/notices/setViewed'), ids);
  }
  getAgreement(hash) {
    return this.http.get(this.getApiUrl(`page?hash=${hash}`), );
  }
  setAgrement(data): Observable<any> {
    return this.http.post(this.getApiUrl('page/agreement'), data);
  }
  agreementConfirm(data) {
    return this.http.post(this.getApiUrl('page/agreementConfirm'), data);
  }
  setNoticeStatuses(formStatus) {
    return this.http.post(this.getApiUrl('cabinet/notices/updateSubscriptions'), formStatus);
  }

  sendPushToken(token) {
    return this.http.post(this.getApiUrl('cabinet/notices/subscribePush'), token);
  }
}
