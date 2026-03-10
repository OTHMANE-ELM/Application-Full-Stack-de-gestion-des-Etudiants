# Spring Boot & Swagger — Student REST API

A simple REST API built with **Spring Boot 3** to manage students, documented with **Swagger UI (OpenAPI 3)**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Spring Boot 3.4.3 |
| Language | Java 17 |
| Database | MySQL |
| ORM | Spring Data JPA / Hibernate |
| API Docs | SpringDoc OpenAPI (Swagger UI) |
| Build Tool | Maven |

---

## Project Structure

```
src/
└── main/
    └── java/ma/fst/spring/
        ├── controllers/     # REST controllers
        ├── entities/        # JPA entities (Student)
        ├── repositories/    # Spring Data JPA repositories
        └── services/        # Business logic
```

---

## Entity

### `Student`

| Field | Type |
|---|---|
| `id` | Long (auto-generated) |
| `nom` | String |
| `prenom` | String |
| `dateNaissance` | Date |

---

## API Endpoints

| Method | URL | Description |
|---|---|---|
| `GET` | `/students/all` | Get all students |
| `GET` | `/students/{id}` | Get student by ID |
| `GET` | `/students/count` | Count total students |
| `GET` | `/students/byYear` | Count students grouped by birth year |
| `POST` | `/students/save` | Create a new student |
| `DELETE` | `/students/{id}` | Delete a student by ID |

---

## Request / Response Examples

### POST `/students/save`
**Request body:**
```json
{
  "nom": "Othmane",
  "prenom": "El Matlini",
  "dateNaissance": "2004-06-12T23:00:00.000Z"
}
```
**Response `201 Created`:**
```json
{
  "id": 6,
  "nom": "Othmane",
  "prenom": "El Matlini",
  "dateNaissance": "2004-06-12T23:00:00.000Z"
}
```

### GET `/students/byYear`
**Response `200 OK`:**
```json
[
  [2017, 1],
  [2026, 2]
]
```

### GET `/students/count`
**Response `200 OK`:**
```
3
```

---

## Configuration

In `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/your_db_name
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
server.port=8082
```

---

## Run the Project

```bash
# Clone the repo
git clone https://github.com/your-username/spring-boot-swagger.git
cd spring-boot-swagger

# Build & run
mvn spring-boot:run
```

> Make sure MySQL is running and the database exists before starting.

---

## Swagger UI

Once the app is running, open:

```
http://localhost:8082/swagger-ui/index.html
```

---
<img width="1325" height="940" alt="1" src="https://github.com/user-attachments/assets/56ecd129-34e6-4fba-8b63-e2eb84caf0b2" />

<img width="1092" height="770" alt="2" src="https://github.com/user-attachments/assets/99fc627d-21f9-4b78-bb39-cdb6c3f98c3a" />

<img width="1098" height="927" alt="3" src="https://github.com/user-attachments/assets/1adddbfa-4fc6-466a-be2e-8545bd451630" />

<img width="1103" height="662" alt="4" src="https://github.com/user-attachments/assets/f9dcec94-92f4-4c18-9986-a9d87f39cb61" />

<img width="1097" height="366" alt="5" src="https://github.com/user-attachments/assets/7edcf9a8-6f19-4fbc-acbf-6b582c015418" />

<img width="1092" height="568" alt="6" src="https://github.com/user-attachments/assets/063b5870-80a5-4116-ac64-94b181af1aeb" />



https://github.com/user-attachments/assets/a8f67869-0aa7-4df3-9e36-5ef6cd60baaa



https://github.com/user-attachments/assets/a34e4919-b725-4edb-8b1d-99cfa81b4753




https://github.com/user-attachments/assets/1a445e29-f0e5-4a69-baef-0ed050c17f53




















