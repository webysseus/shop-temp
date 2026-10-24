import { Link } from 'react-router-dom';
import { Package, Tag, ShoppingCart, Wallet, AlertTriangle, Clock } from 'lucide-react';
import { useStoreData } from '../../context/StoreDataContext';
import Badge from '../../components/ui/Badge';
import { formatPrice, formatDateShort, toPersianDigits } from '../../utils/format';

const STATUS_VARIANTS = {
  pending: 'stone',
  processing: 'gold',
  shipped: 'gold',
  delivered: 'success',
  cancelled: 'danger',
};

export default function Dashboard() {
  const { products, orders, categories, orderStatuses } = useStoreData();

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingCount = orders.filter((order) => order.status === 'pending').length;
  const lowStockCount = products.filter((product) => product.stock > 0 && product.stock <= 5).length;
  const outOfStockCount = products.filter((product) => product.stock === 0).length;

  const stats = [
    { label: 'مجموع فروش', value: formatPrice(totalRevenue), icon: Wallet },
    { label: 'تعداد سفارش‌ها', value: toPersianDigits(orders.length), icon: ShoppingCart },
    { label: 'تعداد محصولات', value: toPersianDigits(products.length), icon: Package },
    { label: 'تعداد دسته‌بندی‌ها', value: toPersianDigits(categories.length), icon: Tag },
  ];

  const recentOrders = orders.slice(0, 5);

  function statusLabel(statusId) {
    return orderStatuses.find((status) => status.id === statusId)?.label || statusId;
  }

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <h1>داشبورد</h1>
      </div>

      <div className="stat-grid">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <div className="stat-card__icon">
              <stat.icon size={20} />
            </div>
            <div>
              <span className="stat-card__value">{stat.value}</span>
              <span className="stat-card__label">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      {(pendingCount > 0 || lowStockCount > 0 || outOfStockCount > 0) && (
        <div className="alert-row">
          {pendingCount > 0 && (
            <Link to="/admin/orders" className="alert-chip">
              <Clock size={16} />
              {toPersianDigits(pendingCount)} سفارش در انتظار تایید
            </Link>
          )}
          {lowStockCount > 0 && (
            <Link to="/admin/products" className="alert-chip">
              <AlertTriangle size={16} />
              {toPersianDigits(lowStockCount)} محصول با موجودی کم
            </Link>
          )}
          {outOfStockCount > 0 && (
            <Link to="/admin/products" className="alert-chip alert-chip--danger">
              <AlertTriangle size={16} />
              {toPersianDigits(outOfStockCount)} محصول ناموجود
            </Link>
          )}
        </div>
      )}

      <div className="admin-card">
        <div className="admin-card__header">
          <h2>سفارش‌های اخیر</h2>
          <Link to="/admin/orders">مشاهده همه</Link>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>شماره سفارش</th>
                <th>مشتری</th>
                <th>تاریخ</th>
                <th>مبلغ</th>
                <th>وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td dir="ltr">{order.id}</td>
                  <td>{order.customerName}</td>
                  <td>{formatDateShort(order.createdAt)}</td>
                  <td>{formatPrice(order.total)}</td>
                  <td>
                    <Badge variant={STATUS_VARIANTS[order.status]}>{statusLabel(order.status)}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
