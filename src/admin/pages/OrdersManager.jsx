import { useState, Fragment } from 'react';
import { ChevronDown } from 'lucide-react';
import { useStoreData } from '../../context/StoreDataContext';
import { useToast } from '../../components/ui/Toast';
import { formatPrice, formatDateShort, toPersianDigits } from '../../utils/format';

export default function OrdersManager() {
  const { orders, orderStatuses, updateOrderStatus } = useStoreData();
  const { showToast } = useToast();
  const [expandedId, setExpandedId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const visibleOrders = statusFilter === 'all' ? orders : orders.filter((order) => order.status === statusFilter);

  function handleStatusChange(orderId, status) {
    updateOrderStatus(orderId, status);
    showToast('وضعیت سفارش به‌روزرسانی شد');
  }

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <h1>سفارش‌ها</h1>
      </div>

      <div className="admin-toolbar">
        <div className="product-filters__categories">
          <button
            className={`filter-pill${statusFilter === 'all' ? ' filter-pill--active' : ''}`}
            onClick={() => setStatusFilter('all')}
            type="button"
          >
            همه
          </button>
          {orderStatuses.map((status) => (
            <button
              key={status.id}
              className={`filter-pill${statusFilter === status.id ? ' filter-pill--active' : ''}`}
              onClick={() => setStatusFilter(status.id)}
              type="button"
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th></th>
                <th>شماره سفارش</th>
                <th>مشتری</th>
                <th>تاریخ</th>
                <th>مبلغ</th>
                <th>وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {visibleOrders.map((order) => {
                const isExpanded = expandedId === order.id;
                return (
                  <Fragment key={order.id}>
                    <tr
                      className="admin-table__row-clickable"
                      onClick={() => setExpandedId(isExpanded ? null : order.id)}
                    >
                      <td>
                        <ChevronDown size={16} className={`order-expand-icon${isExpanded ? ' order-expand-icon--open' : ''}`} />
                      </td>
                      <td dir="ltr">{order.id}</td>
                      <td>{order.customerName}</td>
                      <td>{formatDateShort(order.createdAt)}</td>
                      <td>{formatPrice(order.total)}</td>
                      <td onClick={(event) => event.stopPropagation()}>
                        <select
                          className="status-select"
                          value={order.status}
                          onChange={(event) => handleStatusChange(order.id, event.target.value)}
                        >
                          {orderStatuses.map((status) => (
                            <option key={status.id} value={status.id}>
                              {status.label}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="order-detail-row">
                        <td colSpan={6}>
                          <div className="order-detail">
                            <div>
                              <strong>آدرس ارسال</strong>
                              <p>{order.address}</p>
                              <p dir="ltr">{order.customerPhone}</p>
                            </div>
                            <div>
                              <strong>اقلام سفارش</strong>
                              <ul>
                                {order.items.map((item) => (
                                  <li key={item.productId}>
                                    <span>
                                      {item.name} × {toPersianDigits(item.quantity)}
                                    </span>
                                    <span>{formatPrice(item.price * item.quantity)}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
              {visibleOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="admin-table__empty">
                    سفارشی یافت نشد
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
