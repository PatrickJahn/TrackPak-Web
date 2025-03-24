export class AppRoutes {
  /// error ->
  static readonly error = "/error";
  static readonly notFound = "/404";

  /// pub - General auth ->
  static readonly auth = "/";

  /// Index
  static readonly index = "/";

  // Main routes
  static readonly dashboard = "/dashboard";
  static readonly employees = "/employees";
  static readonly orders = "/orders";

  // Order child routes
  static readonly order = (id: string = ":id") => `/orders/${id}`;
}
