import { defineComponent, reactive, watch, SetupContext } from 'vue';
import { CardListProps, cardListProps } from './card-list-types';
import './card-list.scss';
import Icon from '../../icon/src/icon';
import Button from '../../button/src/button';
import Tooltip from '../../tooltip/src/tooltip';
import Pagination from '../../pagination/src/pagination';
import iconMore from './assets/icon_more.svg';
import iconCheck from './assets/icon-check.svg';
import iconEdit2 from './assets/icon-edit2.svg';
import iconSend from './assets/icon-send.png';
import iconDel from './assets/icon-del.png';
import iconEdit from './assets/icon-edit.png';
import iconOff from './assets/icon-off.png';
import iconSee from './assets/icon-see.png';
import iconReturn from './assets/icon-return.png';
import cardBg from './assets/card-bg.png';
import creatBy from './assets/create-by.svg';
import creatTime from './assets/create-time.svg';

export default defineComponent({
  name: 'NCardList',
  props: cardListProps,
  setup(props: CardListProps, ctx) {
    const cardData: any[] = reactive([]);

    watch(
      () => props.data,
      (newVal: any) => {
        cardData.length = 0;
        cardData.push(...newVal);
      },
      {
        immediate: true,
        deep: true,
      }
    );

    // 自定义图标
    const SvgIcon = (url: any) => {
      return <Icon name="" component={url} />;
    };

    // 传递事件
    const operationFn = (item: any, name: any) => {
      ctx.emit(name, item);
    };

    // 头部状态
    const renderCardStatus = (item: any) => {
      if (item.cardStatus === 1) {
        return <div class="card-header-status green">已发布</div>;
      } else if (item.cardStatus === 0) {
        return <div class="card-header-status gray">已下架</div>;
      } else if (item.cardStatus === 3) {
        return <div class="card-header-status yellow">审核中</div>;
      } else if (item.cardStatus === 4) {
        return <div class="card-header-status red">审核失败</div>;
      }
    };

    // 展示内容
    const renderItem = (item: any) => {
      if (props.cardType === 1) {
        return (
          <div class="card-content">
            {item.cardContentLabel.map((val: any) => (
              <div class="card-content-label">
                <div class="card-content-label-key">
                  <div class="circle"></div>
                  {val.name}
                </div>
                {val.type === 1 ? <span class="card-content-label-value">{val.value}</span> : null}
                {val.type === 2 ? val.value.map((text: any) => <span class="card-content-label-btn">{text}</span>) : null}
              </div>
            ))}
          </div>
        );
      } else if (props.cardType === 2) {
        return (
          <div>
            {item.cardMappingTitle ? (
              <div class="card-content">
                <div class="card-content-name">
                  <div class="circle"></div>
                  <div class="card-content-name-left">{item.cardMappingTitle}</div>
                </div>
                {item.cardMappingLabel.map((val: any) => (
                  <div class="card-content-label">
                    <div class="card-content-label-name">{val.name}</div>
                    {val.type === 1 ? <span class="card-content-label-value">{val.value}</span> : null}
                    {val.type === 2 ? val.value.map((text: any) => <span class="card-content-label-btn">{text}</span>) : null}
                  </div>
                ))}
              </div>
            ) : null}
            {item.cardContentTitle ? (
              <div class="card-content">
                <div class="card-content-name">
                  <div class="circle"></div>
                  <div class="card-content-name-left">{item.cardContentTitle}</div>
                  <span class="card-content-name-btn" onClick={() => operationFn(item, 'cardDispatchFn')}>
                    {item.cardStatus === 1 ? SvgIcon(iconCheck) : SvgIcon(iconEdit2)}
                  </span>
                </div>
                {item.cardContentLabel.map((val: any) => (
                  <div class="card-content-label">
                    <div class="card-content-label-name">{val.name}</div>
                    {val.type === 1 ? <span class="card-content-label-value">{val.value}</span> : null}
                    {val.type === 2 ? val.value.map((text: any) => <span class="card-content-label-btn">{text}</span>) : null}
                  </div>
                ))}
              </div>
            ) : null}
            {item.cardRerunTitle ? (
              <div class="card-content">
                <div class="card-content-name">
                  <div class="circle"></div>
                  <div class="card-content-name-left">{item.cardRerunTitle}</div>
                  <span class="card-content-name-btn" onClick={() => operationFn(item, 'cardRerunFn')}>
                    {item.cardStatus === 1 ? SvgIcon(iconCheck) : SvgIcon(iconEdit2)}
                  </span>
                </div>
                {item.cardContentLabel.map((val: any) => (
                  <div class="card-content-label">
                    <div class="card-content-label-name">{val.name}</div>
                    {val.type === 1 ? <span class="card-content-label-value">{val.value}</span> : null}
                    {val.type === 2 ? val.value.map((text: any) => <span class="card-content-label-btn">{text}</span>) : null}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        );
      } else if (props.cardType === 3) {
        return (
          <div>
            {item.cardRulerTitle ? (
              <div class="card-content">
                <div class="card-content-name">
                  <div class="circle"></div>
                  <div class="card-content-name-left">{item.cardRulerTitle}</div>
                  <span class="card-content-name-btn" onClick={() => operationFn(item, 'cardShowMoreRulerFn')}>
                    {SvgIcon(iconCheck)}
                  </span>
                </div>
                <div class="card-content-outBox">
                  {item.cardRulerLabel.map((val: any) => (
                    <div class="card-content-label">
                      <div class="card-content-label-btn">{val.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            {item.cardContentTitle ? (
              <div class="card-content">
                <div class="card-content-name">
                  <div class="circle"></div>
                  <div class="card-content-name-left">{item.cardContentTitle}</div>
                  <span class="card-content-name-btn" onClick={() => operationFn(item, 'cardDispatchFn')}>
                    {item.cardStatus === 1 ? SvgIcon(iconCheck) : SvgIcon(iconEdit2)}
                  </span>
                </div>
                {item.cardContentLabel.map((val: any) => (
                  <div class="card-content-label">
                    <div class="card-content-label-name">{val.name}</div>
                    {val.type === 1 ? <span class="card-content-label-value">{val.value}</span> : null}
                    {val.type === 2 ? val.value.map((text: any) => <span class="card-content-label-btn">{text}</span>) : null}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        );
      } else if (props.cardType === 4) {
        return (
          <div class="card-content">
            <div class="card-content-label">
              <div class="card-content-label">
                <div class="card-content-label-key">
                  <div class="circle"></div>
                  描述信息
                </div>
                <span class="card-content-label-desc">{item.description ? item.description : '暂无描述'}</span>
              </div>
            </div>
          </div>
        );
      }
    };

    // 更多操作
    const renderMore = (item: any) => {
      return (
        <div class="card-mantle-control">
          {item.cardOperation.indexOf('1') !== -1 ? (
            <div class="card-mantle-control-btn" onClick={() => operationFn(item, 'cardSendFn')}>
              <Tooltip position="bottom" content="发布">
                <img class="card-mantle-control-btn-icon" src={iconSend} alt="" />
              </Tooltip>
            </div>
          ) : null}
          {item.cardOperation.indexOf('2') !== -1 ? (
            <div class="card-mantle-control-btn" onClick={() => operationFn(item, 'cardDelFn')}>
              <Tooltip position="bottom" content="删除">
                <img class="card-mantle-control-btn-icon" src={iconDel} alt="" />
              </Tooltip>
            </div>
          ) : null}
          {item.cardOperation.indexOf('3') !== -1 ? (
            <div class="card-mantle-control-btn" onClick={() => operationFn(item, 'cardEditFn')}>
              <Tooltip position="bottom" content="编辑">
                <img class="card-mantle-control-btn-icon" src={iconEdit} alt="" />
              </Tooltip>
            </div>
          ) : null}
          {item.cardOperation.indexOf('4') !== -1 ? (
            <div class="card-mantle-control-btn" onClick={() => operationFn(item, 'cardOffFn')}>
              <Tooltip position="bottom" content="下架">
                <img class="card-mantle-control-btn-icon" src={iconOff} alt="" />
              </Tooltip>
            </div>
          ) : null}
          {item.cardOperation.indexOf('5') !== -1 ? (
            <div class="card-mantle-control-btn" onClick={() => operationFn(item, 'cardSeeFn')}>
              <Tooltip position="bottom" content="查看">
                <img class="card-mantle-control-btn-icon" src={iconSee} alt="" />
              </Tooltip>
            </div>
          ) : null}
          {item.cardOperation.indexOf('6') !== -1 ? (
            <div class="card-mantle-control-btn" onClick={() => operationFn(item, 'cardRunFn')}>
              <Tooltip position="bottom" content="执行">
                <img class="card-mantle-control-btn-icon" src={iconReturn} alt="" />
              </Tooltip>
            </div>
          ) : null}
        </div>
      );
    };

    // 点击打开遮罩层
    const showMoreFn = (index: number) => {
      cardData[index].showMore = true;
    };

    // 点击关闭遮罩层
    const closeMoreFn = (index: number) => {
      cardData[index].showMore = false;
    };

    // 切换分页
    const onPageIndexChange = (currentPage: number) => {
      operationFn(currentPage, 'cardCurrentChange');
    };

    // 切换分页
    const onPageSizeChange = (size: number) => {
      operationFn(size, 'cardSizeChange');
    };

    return () => (
      <div class="nancalui-package-card-list ">
        <div class="card-box">
          {cardData.map((item: any, index: number) => (
            <div class="card">
              <img class="card-img-bg" src={cardBg} alt="" />
              <div class="card-header">
                <div class="card-header-title">{item.cardTitle}</div>
                {props.noHeaderStatus ? null : renderCardStatus(item)}
              </div>
              <div class="card-type-list">
                <div class="card-date">
                  <span class="card-date-svg">{SvgIcon(creatTime)}</span>
                  {item.cardDate}
                  <span class="card-date-svg">{SvgIcon(creatBy)}</span>
                  {item.cardUser}
                </div>
                {props.cardType === 1 ? <img class="card-right-img" src={item.cardLogo} /> : null}
                {renderItem(item)}
                <div class="card-operation">
                  <div class="card-operation-more" onClick={() => showMoreFn(index)}>
                    {SvgIcon(iconMore)}
                  </div>
                  {props.cardType === 2 && item.cardOperationLabel ? (
                    <Button color="primary" shape="round" class="card-operation-btn" onClick={() => operationFn(item, 'cardDevelopFn')}>
                      {item.cardOperationLabel}
                    </Button>
                  ) : null}
                </div>
              </div>
              <div class={{ 'card-mantle': true, active: item.showMore }} onClick={() => closeMoreFn(index)}>
                {renderMore(item)}
              </div>
            </div>
          ))}
        </div>
        {cardData.length > 0 && props.page ? (
          <div class="footer-pagination">
            <Pagination
              can-view-total={true}
              can-change-page-size={true}
              can-jump-page={true}
              size={props.page.size}
              total={props.page.total}
              pageSize={props.page.pageSize}
              pageIndex={props.page.pageIndex}
              pageSizeOptions={props.page.pageSizeOptions}
              onPageIndexChange={onPageIndexChange}
              onPageSizeChange={onPageSizeChange}
            />
          </div>
        ) : null}
      </div>
    );
  },
});
