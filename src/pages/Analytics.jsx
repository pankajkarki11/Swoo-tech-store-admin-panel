// src/pages/Analytics.jsx
import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import useApi from "../hooks/useApi";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  Users,
  ShoppingCart,
  Package,
  DollarSign,
} from "lucide-react";

const Analytics = () => {
  const { toast } = useOutletContext();
  const api = useApi();

  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30d");
  const [analyticsData, setAnalyticsData] = useState({
    sales: 0,
    orders: 0,
    customers: 0,
    products: 0,
    revenueData: [],
    categoryData: [],
    topProducts: [],
  });

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);

      // Fetch all data
      const [productsRes, cartsRes, usersRes] = await Promise.all([
        api.productAPI.getAll(),
        api.cartAPI.getAll(),
        api.userAPI.getAll(),
      ]);

      const products = productsRes.data || [];
      const carts = cartsRes.data || [];
      const users = usersRes.data || [];

      // Calculate total revenue
      let totalRevenue = 0;
      carts.forEach((cart) => {
        cart.products?.forEach((item) => {
          totalRevenue += item.price * item.quantity;
        });
      });

      // Generate mock revenue data for chart
      const revenueData = generateRevenueData(timeRange, totalRevenue);

      // Generate category distribution
      const categoryData = generateCategoryData(products);

      // Get top products
      const topProducts = getTopProducts(products);

      setAnalyticsData({
        sales: carts.length,
        orders: carts.reduce(
          (total, cart) => total + (cart.products?.length || 0),
          0
        ),
        customers: users.length,
        products: products.length,
        revenueData,
        categoryData,
        topProducts,
        totalRevenue,
      });
    } catch (error) {
      toast.error("Failed to load analytics data");
    } finally {
      setLoading(false);
    }
  };

  const generateRevenueData = (range, totalRevenue) => {
    const data = [];
    const now = new Date();

    switch (range) {
      case "7d":
        for (let i = 6; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(date.getDate() - i);
          data.push({
            date: date.toLocaleDateString("en-US", { weekday: "short" }),
            revenue:
              Math.floor((Math.random() * totalRevenue) / 7) +
              totalRevenue / 14,
          });
        }
        break;

      case "30d":
        for (let i = 29; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(date.getDate() - i);
          data.push({
            date: date.getDate().toString(),
            revenue:
              Math.floor((Math.random() * totalRevenue) / 30) +
              totalRevenue / 60,
          });
        }
        break;

      case "90d":
        for (let i = 89; i >= 0; i -= 3) {
          const date = new Date(now);
          date.setDate(date.getDate() - i);
          data.push({
            date: date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
            revenue:
              Math.floor((Math.random() * totalRevenue) / 30) +
              totalRevenue / 60,
          });
        }
        break;
    }

    return data;
  };

  const generateCategoryData = (products) => {
    const categories = {};

    products.forEach((product) => {
      const category = product.category;
      categories[category] = (categories[category] || 0) + 1;
    });

    return Object.entries(categories)
      .map(([name, count]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        count,
        percentage: Math.round((count / products.length) * 100),
      }))
      .sort((a, b) => b.count - a.count);
  };

  const getTopProducts = (products) => {
    return [...products]
      .sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
      .slice(0, 5)
      .map((product) => ({
        ...product,
        revenue: Math.floor(Math.random() * 10000) + 5000, // Mock revenue
      }));
  };

  const StatCard = ({ title, value, change, trend, icon: Icon, color }) => (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            {value}
          </p>
          {change && (
            <div className="flex items-center mt-2">
              {trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span
                className={`text-sm font-medium ${
                  trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {change}
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your store performance and metrics
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <select
              className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>

          <Button variant="outline">
            <Download className="h-5 w-5 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`$${analyticsData.totalRevenue.toFixed(2)}`}
          change="+12.5%"
          trend="up"
          icon={DollarSign}
          color="bg-green-500"
        />

        <StatCard
          title="Total Orders"
          value={analyticsData.sales}
          change="+8.2%"
          trend="up"
          icon={ShoppingCart}
          color="bg-blue-500"
        />

        <StatCard
          title="Customers"
          value={analyticsData.customers}
          change="+5.7%"
          trend="up"
          icon={Users}
          color="bg-purple-500"
        />

        <StatCard
          title="Products"
          value={analyticsData.products}
          change="+3.4%"
          trend="up"
          icon={Package}
          color="bg-orange-500"
        />
      </div>

      {/* Charts and Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <Card.Header>
            <Card.Title>Revenue Overview</Card.Title>
            <Card.Description>Sales performance over time</Card.Description>
          </Card.Header>

          <div className="h-64 flex items-end space-x-2 pt-4">
            {analyticsData.revenueData.map((item, index) => {
              const maxRevenue = Math.max(
                ...analyticsData.revenueData.map((d) => d.revenue)
              );
              const height = (item.revenue / maxRevenue) * 180;

              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-lg"
                    style={{ height: `${height}px` }}
                  />
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {item.date}
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                    ${item.revenue.toFixed(0)}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Category Distribution */}
        <Card>
          <Card.Header>
            <Card.Title>Category Distribution</Card.Title>
            <Card.Description>Products by category</Card.Description>
          </Card.Header>

          <div className="space-y-4">
            {analyticsData.categoryData.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {category.name}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {category.count} products ({category.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top Products */}
      <Card>
        <Card.Header>
          <Card.Title>Top Performing Products</Card.Title>
          <Card.Description>Best selling products by revenue</Card.Description>
        </Card.Header>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {analyticsData.topProducts.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-lg object-cover"
                          src={product.image}
                          alt={product.title}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {product.title.length > 40
                            ? `${product.title.substring(0, 40)}...`
                            : product.title}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="secondary">{product.category}</Badge>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    ${product.price}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-1">★</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {product.rating?.rate || "N/A"}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">
                        ({product.rating?.count || 0})
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">
                    ${product.revenue.toFixed(2)}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="success">Active</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <Card.Header>
            <Card.Title>Conversion Rate</Card.Title>
          </Card.Header>

          <div className="text-center py-8">
            <div className="text-5xl font-bold text-green-600 mb-2">4.7%</div>
            <p className="text-gray-600 dark:text-gray-400">
              Visitor to customer conversion
            </p>
          </div>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title>Avg. Order Value</Card.Title>
          </Card.Header>

          <div className="text-center py-8">
            <div className="text-5xl font-bold text-blue-600 mb-2">$84.32</div>
            <p className="text-gray-600 dark:text-gray-400">
              Average order amount
            </p>
          </div>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title>Customer Satisfaction</Card.Title>
          </Card.Header>

          <div className="text-center py-8">
            <div className="text-5xl font-bold text-purple-600 mb-2">92%</div>
            <p className="text-gray-600 dark:text-gray-400">
              Positive feedback rate
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
