// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import useApi from "../hooks/useApi";
import { Lock, Mail, ShoppingBag } from "lucide-react";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const api = useApi();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Using demo credentials from FakeStoreAPI
      const response = await api.authAPI.login({
        username: "mor_2314",
        password: "83r5^_",
      });

      // Store token and user info
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: formData.username,
          token: response.data.token,
        })
      );

      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      // For demo purposes, allow login even if API fails
      console.log("Using demo mode due to API failure");

      // Set demo token for development
      localStorage.setItem("authToken", "demo_token_12345");
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: formData.username || "demo_user",
          token: "demo_token_12345",
        })
      );

      setIsAuthenticated(true);
      navigate("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setFormData({
      username: "mor_2314",
      password: "83r5^_",
    });

    setTimeout(() => {
      handleSubmit(new Event("submit"));
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
            <ShoppingBag className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            SwooTechMart
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Professional E-commerce Dashboard
          </p>
        </div>

        <Card>
          <Card.Header>
            <Card.Title>Welcome Back</Card.Title>
            <Card.Description>
              Sign in to your account to continue
            </Card.Description>
          </Card.Header>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                label="Username"
                leftIcon={<Mail className="h-5 w-5" />}
                value={formData.username}
                onChange={(e) => {
                  setFormData({ ...formData, username: e.target.value });
                  if (errors.username) setErrors({ ...errors, username: "" });
                }}
                error={errors.username}
                placeholder="Enter your username"
                required
              />

              <Input
                label="Password"
                type="password"
                leftIcon={<Lock className="h-5 w-5" />}
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  if (errors.password) setErrors({ ...errors, password: "" });
                }}
                error={errors.password}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>

              <button
                type="button"
                className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                Forgot password?
              </button>
            </div>

            <div className="mt-6 space-y-3">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>

              <Button
                type="button"
                variant="outline"
                fullWidth
                onClick={handleDemoLogin}
                disabled={isLoading}
              >
                Use Demo Account
              </Button>
            </div>
          </form>

          <Card.Footer className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Demo credentials: mor_2314 / 83r5^_
            </p>
          </Card.Footer>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2024 SwooTechMart. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
