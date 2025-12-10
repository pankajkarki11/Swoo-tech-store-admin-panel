// src/pages/Settings.jsx
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Badge from "../components/ui/Badge";
import {
  Save,
  Bell,
  Shield,
  Palette,
  Globe,
  Mail,
  Lock,
  Users,
  Database,
  CreditCard,
} from "lucide-react";

const Settings = () => {
  const { toast } = useOutletContext();

  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(false);

  const [generalSettings, setGeneralSettings] = useState({
    storeName: "SwooTechMart",
    storeEmail: "admin@swootechmart.com",
    storePhone: "+1 (555) 123-4567",
    storeAddress: "123 Business Ave, Tech City, TC 12345",
    currency: "USD",
    timezone: "America/New_York",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderNotifications: true,
    stockNotifications: true,
    marketingEmails: false,
    pushNotifications: true,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    ipWhitelist: "",
    loginAttempts: 5,
  });

  const tabs = [
    { id: "general", label: "General", icon: Globe },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "users", label: "Users & Permissions", icon: Users },
    { id: "payment", label: "Payment", icon: CreditCard },
    { id: "advanced", label: "Advanced", icon: Database },
  ];

  const handleSave = async () => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Settings saved successfully");
      setLoading(false);
    }, 1000);
  };

  const handleReset = () => {
    // Reset to default settings
    setGeneralSettings({
      storeName: "SwooTechMart",
      storeEmail: "admin@swootechmart.com",
      storePhone: "+1 (555) 123-4567",
      storeAddress: "123 Business Ave, Tech City, TC 12345",
      currency: "USD",
      timezone: "America/New_York",
    });

    setNotificationSettings({
      emailNotifications: true,
      orderNotifications: true,
      stockNotifications: true,
      marketingEmails: false,
      pushNotifications: true,
    });

    setSecuritySettings({
      twoFactorAuth: false,
      sessionTimeout: 30,
      ipWhitelist: "",
      loginAttempts: 5,
    });

    toast.info("Settings reset to defaults");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Store Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Store Name"
                value={generalSettings.storeName}
                onChange={(e) =>
                  setGeneralSettings({
                    ...generalSettings,
                    storeName: e.target.value,
                  })
                }
                required
              />

              <Input
                label="Store Email"
                type="email"
                value={generalSettings.storeEmail}
                onChange={(e) =>
                  setGeneralSettings({
                    ...generalSettings,
                    storeEmail: e.target.value,
                  })
                }
                required
              />

              <Input
                label="Store Phone"
                value={generalSettings.storePhone}
                onChange={(e) =>
                  setGeneralSettings({
                    ...generalSettings,
                    storePhone: e.target.value,
                  })
                }
              />

              <Input
                label="Currency"
                value={generalSettings.currency}
                onChange={(e) =>
                  setGeneralSettings({
                    ...generalSettings,
                    currency: e.target.value,
                  })
                }
              />

              <div className="md:col-span-2">
                <Input
                  label="Store Address"
                  value={generalSettings.storeAddress}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      storeAddress: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Timezone
                </label>
                <select
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={generalSettings.timezone}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      timezone: e.target.value,
                    })
                  }
                >
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="Europe/London">London (GMT)</option>
                </select>
              </div>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Notification Preferences
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900 dark:text-white">
                    Email Notifications
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive important updates via email
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notificationSettings.emailNotifications}
                    onChange={(e) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        emailNotifications: e.target.checked,
                      })
                    }
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900 dark:text-white">
                    Order Notifications
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Get notified for new orders
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notificationSettings.orderNotifications}
                    onChange={(e) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        orderNotifications: e.target.checked,
                      })
                    }
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900 dark:text-white">
                    Stock Notifications
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Alerts for low stock levels
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notificationSettings.stockNotifications}
                    onChange={(e) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        stockNotifications: e.target.checked,
                      })
                    }
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900 dark:text-white">
                    Marketing Emails
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive promotional offers and updates
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notificationSettings.marketingEmails}
                    onChange={(e) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        marketingEmails: e.target.checked,
                      })
                    }
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900 dark:text-white">
                    Push Notifications
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive browser push notifications
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notificationSettings.pushNotifications}
                    onChange={(e) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        pushNotifications: e.target.checked,
                      })
                    }
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Security Settings
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900 dark:text-white">
                    Two-Factor Authentication
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={securitySettings.twoFactorAuth}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        twoFactorAuth: e.target.checked,
                      })
                    }
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Session Timeout (minutes)
                </label>
                <select
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={securitySettings.sessionTimeout}
                  onChange={(e) =>
                    setSecuritySettings({
                      ...securitySettings,
                      sessionTimeout: parseInt(e.target.value),
                    })
                  }
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">60 minutes</option>
                  <option value="120">2 hours</option>
                  <option value="0">Never</option>
                </select>
              </div>

              <Input
                label="IP Whitelist (comma-separated)"
                value={securitySettings.ipWhitelist}
                onChange={(e) =>
                  setSecuritySettings({
                    ...securitySettings,
                    ipWhitelist: e.target.value,
                  })
                }
                placeholder="192.168.1.1, 10.0.0.1"
                helperText="Only allow access from these IP addresses"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Failed Login Attempts Before Lockout
                </label>
                <select
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={securitySettings.loginAttempts}
                  onChange={(e) =>
                    setSecuritySettings({
                      ...securitySettings,
                      loginAttempts: parseInt(e.target.value),
                    })
                  }
                >
                  <option value="3">3 attempts</option>
                  <option value="5">5 attempts</option>
                  <option value="10">10 attempts</option>
                  <option value="0">No limit</option>
                </select>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
                Security Status
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Password Strength
                  </span>
                  <Badge variant="success">Strong</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Last Password Change
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    30 days ago
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Last Login
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    2 hours ago
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Settings Panel
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Configure your store settings from the tabs above
            </p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Configure your store settings and preferences
          </p>
        </div>

        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="primary" onClick={handleSave} loading={loading}>
            <Save className="h-5 w-5 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Tabs */}
        <Card className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200
                    ${
                      activeTab === tab.id
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span className="ml-3 font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </Card>

        {/* Settings Content */}
        <Card className="lg:col-span-3">{renderTabContent()}</Card>
      </div>

      {/* System Status */}
      <Card>
        <Card.Header>
          <Card.Title>System Status</Card.Title>
          <Card.Description>
            Overview of your store's system health
          </Card.Description>
        </Card.Header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                API Status
              </span>
              <Badge variant="success">Online</Badge>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: "100%" }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Database
              </span>
              <Badge variant="success">Connected</Badge>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: "100%" }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Storage
              </span>
              <Badge variant="warning">65% Used</Badge>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-yellow-600 h-2 rounded-full"
                style={{ width: "65%" }}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
