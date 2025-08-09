---
title: "My First Blog"
slug: "my-first-blog"
date: "2025-08-06"
---


---

# CRUD Operation for Employee Management

### Project Documentation

---

##  Overview

This is a simple project that demonstrates **CRUD (Create, Read, Update, Delete)** operations for managing employee data using **ASP.NET Core** and **Entity Framework Core** with a **SQL Server** database.

---

##  Project Structure

### 1. **Models**

Create a folder named `Models`, and inside it, create a subfolder `Entities`. Add the `Employee.cs` file to define the employee entity.

#### ➤ File: `Models/Entities/Employee.cs`

```csharp
namespace CURDOperation.Models.Entities
{
    public class Employee
    {
        public Guid Id { get; set; }

        public required string Name { get; set; }

        public required string Email { get; set; }

        public string? Phone { get; set; } // Optional (nullable)

        public decimal Salary { get; set; }
    }
}
```

**📘 Description:**  
This model represents the employee entity with the following properties:

- `Id` – Unique identifier
    
- `Name`, `Email` – Required fields
    
- `Phone` – Optional
    
- `Salary` – Numeric value representing the employee's salary
    

---

### 2. **Database Context**

Create a folder named `Data`, and add the file `ApplicationDbContext.cs`.

#### ➤ File: `Data/ApplicationDbContext.cs`

```csharp
using CURDOperation.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace CURDOperation.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
    }
}
```

**📘 Description:**  
This class sets up the database context using Entity Framework Core. It exposes the `Employees` table via `DbSet<Employee>`.

---

### 3. **SQL Server Connection**

Update the `appsettings.json` to define the connection string for your SQL Server.

#### ➤ File: `appsettings.json`

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=BIDUR\\SQLEXPRESS;Database=EmployeesDb;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

---

### 4. **Register DbContext in `Program.cs`**

In the `Program.cs` file, add the following code to register the database context service:

#### ➤ Code Snippet (Program.cs)

```csharp
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
```

**📘 Description:**  
This registers `ApplicationDbContext` and sets it up to use the SQL Server with the specified connection string.

---

### 5. **Controller Example (Optional Placeholder)**

Here is a placeholder controller `WeatherForecastController.cs` that demonstrates how to use routing and inject services. This will later be replaced with a controller for `Employee`.
Here the detailes How Routing works:  [[Routes]]
#### ➤ File: `Controllers/WeatherForecastController.cs`

```csharp
using System.ComponentModel.DataAnnotations;

using System.Web;

using CURDOperation.Data;

using CURDOperation.Models;

using CURDOperation.Models.Entites;

using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;

namespace CURDOperation.Controllers

{

    // Route: localhost:8000/api/Employee

    [Route("api/[controller]")]

    [ApiController]

    public class EmployeeController : ControllerBase

    {

        private readonly ApplicationDbContext dbContext;

        public EmployeeController(ApplicationDbContext dbContext)

        {

            this.dbContext = dbContext;

        }

        [HttpGet]

        public IActionResult GetAllEmployee()

        {

            var allEmployees = dbContext.Employees.ToList();

            return Ok(allEmployees);

        }

        [HttpPost]

        public IActionResult AddEmployee(AddEmployee addEmployee)

        {

            var employeeEntitiy = new Employee()

            {

                Name = addEmployee.Name,

                Email = addEmployee.Email,

                Phone = addEmployee.Phone,

                Salary = addEmployee.Salary,

            };

            dbContext.Employees.Add(employeeEntitiy);

            dbContext.SaveChanges();

            return Ok(employeeEntitiy);

        }

        [HttpGet]

        [Route("{id:guid}")]

        public IActionResult GetEmployeeByID(Guid id)

        {

            var employee = dbContext.Employees.Find(id);

            if (employee == null)

            {

                return NotFound();

            }

            return Ok(employee);

        }

        [HttpDelete("{id:guid}")]

        public IActionResult DeleteEmployee(Guid id)

        {

            var employee = dbContext.Employees.Find(id);

            if (employee == null)

            {

                return NotFound();

            }

            dbContext.Employees.Remove(employee);

            dbContext.SaveChanges();

            return NoContent();
        }

        [HttpPut]

        [Route("{id:guid}")]

        public IActionResult UpadeEmployee(Guid id, UpdateEmployee updateEmployee)

        {
            var employee = dbContext.Employees.Find(id);

            if (employee == null)

            {

                return NotFound();

            }

            employee.Name = updateEmployee.Name;

            employee.Email = updateEmployee.Email;

            employee.Phone = updateEmployee.Phone;

            employee.Salary = updateEmployee.Salary;

            dbContext.SaveChanges();

            return Ok(employee);

        }

    }

}
```

**📘 Description:**  
This controller is used for demonstration purposes. In your CRUD application, you'll create a new `EmployeeController` to handle employee-specific endpoints.

---

## ✅ Next Steps

- Create an `EmployeeController` to implement CRUD actions (GET, POST, PUT, DELETE).
    
- Set up Swagger for testing the APIs.
    
- Run migrations using `dotnet ef migrations add InitialCreate` and `dotnet ef database update`.
    

---

## 📎 Notes

- Ensure the **Entity Framework Core** and **SQL Server** packages are installed.
    
- Use `[ApiController]` and routing attributes for your real API controller (e.g., `EmployeeController`).
    

---
Note : /openapi/v1.json


