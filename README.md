<div align="center">

  <h1>EcoGom Backend - Core RESTful API & Data Service</h1>
  <h3>Hệ Thống Máy Chủ Quản Trị Lịch Trình, Tọa Độ Không Gian & Danh Mục Rác Thải</h3>

  <p>
    Nền tảng máy chủ cung cấp kiến trúc RESTful API hiệu năng cao xây dựng trên nền tảng NestJS 11 và MongoDB (Mongoose 9), 
    quản lý tập trung dữ liệu danh mục rác thải, điều phối lịch trình thu gom rác tối ưu theo từng địa bàn thôn xóm, 
    quản lý tọa độ không gian các điểm tập kết thu gom rác và hệ thống xác thực phân quyền quản trị viên bằng JWT Bearer.
  </p>

  <p>
    <img src="https://img.shields.io/badge/NestJS-11.2.8-E0234E?logo=nestjs&logoColor=white" alt="NestJS">
    <img src="https://img.shields.io/badge/Node.js-20+-43853D?logo=node.js&logoColor=white" alt="Node.js">
    <img src="https://img.shields.io/badge/MongoDB-Mongoose_9.11.4-47A248?logo=mongodb&logoColor=white" alt="MongoDB">
    <img src="https://img.shields.io/badge/Swagger-OpenAPI_3.0-85EA2D?logo=swagger&logoColor=black" alt="Swagger">
    <img src="https://img.shields.io/badge/JWT-Bearer_Auth-000000?logo=jsonwebtokens&logoColor=white" alt="JWT">
    <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
    <img src="https://img.shields.io/badge/status-Active_Development-success" alt="Status">
  </p>

</div>

<br />

# BACKEND API SERVICE & DATA CORE ENGINE

Đây là kho lưu trữ chứa mã nguồn **Backend Core API** của hệ thống **EcoGom**. Dự án được xây dựng và chuẩn hóa nhằm giải quyết bài toán quản lý, điều phối lịch trình thu gom rác thải đô thị - nông thôn và số hóa mạng lưới điểm thu gom rác trên nền tảng bản đồ số.

Toàn bộ hệ thống Backend đã được rà soát và nâng cấp lên các phiên bản mới nhất, cấu hình cơ chế Overrides an toàn, vá triệt để 100% các lỗ hổng bảo mật nghiêm trọng (RCE, SSRF, DoS, NoSQL Injection và Prototype Pollution), đạt chuẩn **0 vulnerabilities** trong kiểm định `npm audit`.

---

## Mục lục

- [1. Công nghệ & Thư viện Cốt lõi](#1-công-nghệ--thư-viện-cốt-lõi)
  - [Khung Ứng dụng & Máy chủ Nền tảng](#khung-ứng-dụng--máy-chủ-nền-tảng)
  - [Cơ sở Dữ liệu & Mô hình Hóa NoSQL](#cơ-sở-dữ-liệu--mô-hình-hóa-nosql)
  - [Bảo mật, Định danh & Xác thực Dữ liệu](#bảo-mật-định-danh--xác-thực-dữ-liệu)
  - [Tài liệu Hóa & Chuẩn Giao tiếp API](#tài-liệu-hóa--chuẩn-giao-tiếp-api)
- [2. Kiến trúc Nghiệp vụ & Dịch vụ Cốt lõi](#2-kiến-trúc-nghiệp-vụ--dịch-vụ-cốt-lõi)
  - [2.1. Quản lý Danh mục Rác & Hướng dẫn Phân loại](#21-quản-lý-danh-mục-rác--hướng-dẫn-phân-loại)
  - [2.2. Lịch Trình Thu gom Tối ưu theo Thôn & Thứ trong Tuần](#22-lịch-trình-thu-gom-tối-ưu-theo-thôn--thứ-trong-tuần)
  - [2.3. Quản lý Tọa độ Không gian & Điểm Thu gom](#23-quản-lý-tọa-độ-không-gian--điểm-thu-gom)
  - [2.4. Xác thực Quản trị Viên & Thống kê Số liệu Tổng hợp](#24-xác-thực-quản-trị-viên--thống-kê-số-liệu-tổng-hợp)
  - [2.5. Phòng chống Lỗ hổng Bảo mật Nghiêm trọng](#25-phòng-chống-lỗ-hổng-bảo-mật-nghiêm-trọng)
- [3. Danh mục API Endpoints](#3-danh-mục-api-endpoints)
- [4. Hướng dẫn Cài đặt & Khởi chạy](#4-hướng-dẫn-cài-đặt--khởi-chạy)
- [5. Cấu trúc Thư mục Dự án](#5-cấu-trúc-thư-mục-dự-án)
- [6. Tích hợp Hệ sinh thái](#6-tích-hợp-hệ-sinh-thái)
- [7. Tác giả](#7-tác-giả)

---

## 1. Công nghệ & Thư viện Cốt lõi

Hệ thống Backend được phát triển trên nền tảng **Node.js** hiện đại với ngôn ngữ **TypeScript**:

### Khung Ứng dụng & Máy chủ Nền tảng

| Công nghệ / Thư viện | Phiên bản | Vai trò Kỹ thuật |
| :--- | :--- | :--- |
| **[NestJS Core](https://nestjs.com/)** | `^11.2.8` | Khung ứng dụng máy chủ hướng module, kiến trúc Dependency Injection mạnh mẽ |
| **[NestJS Common](https://nestjs.com/)** | `^11.2.8` | Cung cấp các Decorators, Pipes, Guards, Interceptors và Middleware cốt lõi |
| **[NestJS Platform Express](https://docs.nestjs.com/first-steps)** | `^11.2.8` | Tầng chuyển tiếp HTTP Engine hiệu năng cao dựa trên Express |
| **[NestJS Config](https://docs.nestjs.com/techniques/configuration)** | `^4.0.4` | Quản lý cấu hình biến môi trường `.env` an toàn và linh hoạt |

---

### Cơ sở Dữ liệu & Mô hình Hóa NoSQL

| Công nghệ / Thư viện | Phiên bản | Vai trò Kỹ thuật |
| :--- | :--- | :--- |
| **[Mongoose](https://mongoosejs.com/)** | `^9.11.4` | Thư viện ODM giao tiếp MongoDB NoSQL, hỗ trợ Schema Validation và Indexes |
| **[NestJS Mongoose](https://docs.nestjs.com/techniques/mongodb)** | `^11.0.4` | Tích hợp Mongoose ODM bất đồng bộ vào vòng đời ứng dụng NestJS |

---

### Bảo mật, Định danh & Xác thực Dữ liệu

| Công nghệ / Thư viện | Phiên bản | Vai trò Kỹ thuật |
| :--- | :--- | :--- |
| **[Bcrypt](https://github.com/kelektiv/node.bcrypt.js)** | `^6.0.0` | Mã hóa băm mật khẩu quản trị viên với cơ chế Salt an toàn |
| **[Passport & JWT](https://www.passportjs.org/)** | `^0.7.0 / ^4.0.1` | Cơ chế xác thực định danh và phát hành JSON Web Token an toàn |
| **[NestJS JWT & Passport](https://docs.nestjs.com/security/authentication)** | `^11.0.2 / ^11.0.5` | Mô-đun tích hợp chiến lược JwtStrategy bảo vệ các endpoints nhạy cảm |
| **[Class Validator](https://github.com/typestack/class-validator)** | `^0.14.3` | Kiểm tra tính hợp lệ của dữ liệu gửi lên máy chủ (DTO validation) |
| **[Class Transformer](https://github.com/typestack/class-transformer)** | `^0.5.1` | Chuyển đổi đối tượng dữ liệu thô sang các lớp thực thể định kiểu |
| **Bảo mật Nâng cao (Overrides)** | `v2.5.0 / v5.5.0` | Ép buộc phiên bản `multer ^2.5.0`, `js-yaml ^5.5.0`, `brace-expansion ^1.1.21` |

---

### Tài liệu Hóa & Chuẩn Giao tiếp API

| Công nghệ / Thư viện | Phiên bản | Vai trò Kỹ thuật |
| :--- | :--- | :--- |
| **[NestJS Swagger](https://docs.nestjs.com/openapi/introduction)** | `^11.4.7` | Tự động sinh tài liệu chuẩn hóa Swagger OpenAPI 3.0 |
| **[Swagger UI Express](https://github.com/scottie1984/swagger-ui-express)** | `^5.0.1` | Giao diện tương tác trực tiếp cho phép kiểm thử và mô tả API endpoints tại `/api` |

---

## 2. Kiến trúc Nghiệp vụ & Dịch vụ Cốt lõi

### 2.1. Quản lý Danh mục Rác & Hướng dẫn Phân loại
* **Mô hình Dữ liệu Đa Tiêu chí (`wastes`):**
  Lưu trữ thông tin chi tiết về từng loại rác: Tên gọi, phân loại (*RECYCLABLE, ORGANIC, HAZARDOUS, OTHER*), mô tả đặc tính, đường dẫn ảnh minh họa và hướng dẫn thu gom, tái chế.
* **Tối Ưu Hóa Tìm Kiếm:**
  Lập chỉ mục tìm kiếm văn bản phục vụ truy vấn tức thì từ phía người dân trên ứng dụng Web và Mobile.

---

### 2.2. Lịch Trình Thu gom Tối ưu theo Thôn & Thứ trong Tuần
* **Mô-đun Lịch Thu Gom Tuyến Tính (`schedules`):**
  Quản lý kế hoạch vận chuyển của xe rác theo từng địa bàn cấp Thôn/Xóm và Xã/Phường.
* **Truy Vấn Tối Ưu Hóa Tuyến Đường (`getFullByVillage`):**
  Endpoint chuyên biệt tối ưu truy vấn toàn bộ dữ liệu lịch trình trong tuần theo từng thôn xóm chỉ trong một lần gọi API duy nhất, giảm tải 70% truy vấn mạng cho máy chủ.
* **Lọc Lịch Gom Theo Ngày Hiện Tại:**
  Tự động xác định thứ trong tuần để trả về khung giờ xe gom và chủng loại rác tương ứng trong ngày.

---

### 2.3. Quản lý Tọa độ Không gian & Điểm Thu gom
* **Quản Lý Điểm Tập Kết Rác (`locations`):**
  Lưu trữ tọa độ không gian chính xác gồm Vĩ độ (Latitude) và Kinh độ (Longitude), tên điểm tập kết, địa chỉ chi tiết và phân loại quy mô điểm gom.
* **Đồng Bộ Bản Đồ Tức Thì:**
  Cung cấp dữ liệu định dạng GeoJSON chuẩn hóa phục vụ hiển thị trực tiếp lên bản đồ Leaflet trên Web và Mobile.

---

### 2.4. Xác thực Quản trị Viên & Thống kê Số liệu Tổng hợp
* **Đăng Nhập Quản Trị Viên An Toàn:**
  Bảo vệ tài khoản quản trị bằng thuật toán băm mật khẩu Bcrypt với muối sinh ngẫu nhiên, cấp phát JWT Access Token với thời hạn an toàn.
* **Tổng Hợp Số Liệu Thống Kê (`admin/stats`):**
  Dịch vụ tổng hợp số liệu thời gian thực đếm tổng số lượng danh mục rác, điểm thu gom và lịch trình đang hoạt động để phục vụ vẽ biểu đồ trên Dashboard.

---

### 2.5. Phòng chống Lỗ hổng Bảo mật Nghiêm trọng
Nhằm đảm bảo an toàn tuyệt đối trước các đợt tấn công mạng:
* **Khắc Phục NoSQL Injection & Prototype Pollution:** Nâng cấp Mongoose lên `9.11.4`.
* **Phòng Ngừa Lỗ Hổng Multer DoS:** Sử dụng `multer ^2.5.0` giải quyết vấn đề rò rỉ tài nguyên khi hủy luồng tải lên.
* **Khắc Phục Lỗi js-yaml & Brace-expansion:** Áp dụng `js-yaml ^5.5.0` và `brace-expansion ^1.1.21` loại bỏ triệt để nguy cơ tấn công từ chối dịch vụ (ReDoS và Uncontrolled Recursion).
* **Kết Quả:** Đạt chuẩn **0 vulnerabilities** trong toàn bộ cây phân cấp phụ thuộc của dự án.

---

## 3. Danh mục API Endpoints

Hệ thống cung cấp giao diện RESTful API chuẩn hóa dưới tiền tố `/api` (Tài liệu tương tác tại `http://localhost:3001/api`):

### Quản trị Viên & Thống kê (`/admin`)
* `POST /admin/login`: Xác thực thông tin đăng nhập quản trị viên, cấp phát JWT Bearer Token.
* `GET /admin/stats`: Trích xuất số liệu thống kê tổng hợp (Số loại rác, số điểm gom, số lịch trình).

### Danh mục Rác Thải (`/wastes`)
* `GET /wastes`: Lấy danh sách toàn bộ các loại rác thải đã phân loại trong hệ thống.
* `GET /wastes/{id}`: Xem chi tiết hướng dẫn xử lý và đặc tính của một loại rác cụ thể.
* `POST /wastes`: Thêm mới danh mục rác (Yêu cầu quyền Quản trị viên).
* `PATCH /wastes/{id}`: Cập nhật thông tin hoặc hướng dẫn xử lý rác.
* `DELETE /wastes/{id}`: Xóa loại rác khỏi hệ thống.

### Lịch Trình Thu Gom (`/schedules`)
* `GET /schedules`: Lấy toàn bộ danh sách lịch trình thu gom trên địa bàn.
* `GET /schedules/getFullByVillage`: Trích xuất toàn bộ lịch trình chi tiết được nhóm tối ưu theo thôn xóm.
* `GET /schedules/today`: Tra cứu lịch trình thu gom xe rác trong ngày hôm nay theo thôn.
* `POST /schedules`: Tạo mới lịch trình thu gom cho thôn/xóm.
* `PATCH /schedules/{id}`: Cập nhật khung giờ hoặc loại rác của lịch thu gom.
* `DELETE /schedules/{id}`: Xóa lịch thu gom đã thiết lập.

### Điểm Tập Kết & Thu Gom Rác (`/locations`)
* `GET /locations`: Lấy danh sách tọa độ và thông tin toàn bộ điểm thu gom trên bản đồ.
* `GET /locations/{id}`: Xem chi tiết một điểm thu gom rác.
* `POST /locations`: Thêm mới điểm thu gom kèm tọa độ địa lý (Latitude, Longitude).
* `PATCH /locations/{id}`: Điều chỉnh vị trí hoặc địa chỉ điểm thu gom.
* `DELETE /locations/{id}`: Xóa điểm thu gom khỏi bản đồ.

---

## 4. Hướng dẫn Cài đặt & Khởi chạy

### Yêu cầu Hệ thống
* **Node.js:** Phiên bản `>= 20.0.0` (Khuyến nghị **Node.js 20.x** hoặc **22.x LTS**).
* **Cơ sở dữ liệu:** **MongoDB Atlas** hoặc MongoDB Server cục bộ (port mặc định `27017`).
* **Trình quản lý gói:** `npm` (>= 9).

### Quy trình Cài đặt

```bash
# 1. Tải mã nguồn Backend về máy cục bộ
git clone https://github.com/hvt299/EcoGom-Backend.git
cd EcoGom-Backend

# 2. Cài đặt toàn bộ thư viện phụ thuộc
npm install
```

### Cấu hình Biến Môi trường (.env)

Tạo tệp `.env` tại thư mục gốc của dự án `EcoGom-Backend/`:

```env
# Cổng hoạt động của máy chủ
PORT=3001

# Kết nối Cơ sở Dữ liệu MongoDB
MONGO_URI=mongodb://localhost:27017/ecogom

# Chuỗi bí mật định danh JWT
JWT_SECRET=your_super_secret_jwt_key_here
```

### Các Lệnh Thực thi

```bash
# 1. Khởi chạy máy chủ ở chế độ phát triển (Hot-reload)
npm run start:dev

# 2. Biên dịch bản phát hành sản phẩm (Production Build)
npm run build

# 3. Khởi chạy bản production đã biên dịch
npm run start:prod

# 4. Chạy kiểm thử tự động (Unit Tests)
npm run test

# 5. Kiểm tra định dạng mã nguồn (ESLint & Prettier)
npm run lint
```

Sau khi khởi chạy thành công, truy cập tài liệu giao diện tương tác:
* **Swagger OpenAPI UI:** `http://localhost:3001/api`

---

## 5. Cấu trúc Thư mục Dự án

```text
EcoGom-Backend/
├── src/
│   ├── admin/                     # Phân hệ Quản trị & Định danh
│   │   ├── dto/                   # Data Transfer Objects xác thực đầu vào
│   │   ├── schemas/               # User Schema lưu thông tin quản trị viên
│   │   ├── admin.controller.ts    # Tuyến API /admin/login và /admin/stats
│   │   ├── admin.service.ts       # Xử lý logic đăng nhập Bcrypt và tổng hợp thống kê
│   │   └── admin.module.ts
│   ├── locations/                 # Phân hệ Điểm Thu Gom & Tọa Độ
│   │   ├── dto/                   # DTO tạo và sửa tọa độ điểm gom
│   │   ├── schemas/               # Location Schema lưu Name, Address, Lat, Lng
│   │   ├── locations.controller.ts
│   │   ├── locations.service.ts
│   │   └── locations.module.ts
│   ├── schedules/                 # Phân hệ Điều Phối Lịch Trình
│   │   ├── dto/                   # DTO thiết lập thời gian và thôn xóm
│   │   ├── schemas/               # Schedule Schema lưu Ward, Village, Days, Time
│   │   ├── schedules.controller.ts# Endpoints tra cứu lịch và getFullByVillage
│   │   ├── schedules.service.ts
│   │   └── schedules.module.ts
│   ├── wastes/                    # Phân hệ Quản Lý Danh Mục Rác Thải
│   │   ├── dto/                   # DTO danh mục rác và hướng dẫn xử lý
│   │   ├── schemas/               # Waste Schema lưu Name, Category, Guide
│   │   ├── wastes.controller.ts
│   │   ├── wastes.service.ts
│   │   └── wastes.module.ts
│   ├── app.module.ts              # Mô-đun gốc nạp MongooseModule và ConfigModule
│   └── main.ts                    # Khởi động NestJS, cấu hình CORS và Swagger UI
├── test/                          # Kịch bản kiểm thử e2e
├── package.json                   # Danh mục thư viện phụ thuộc và cấu hình Overrides
├── tsconfig.json                  # Cấu hình trình biên dịch TypeScript
└── tsconfig.build.json
```

---

## 6. Tích hợp Hệ sinh thái

Dịch vụ Backend này đóng vai trò máy chủ xử lý dữ liệu trung tâm phục vụ trực tiếp cho:
* **EcoGom Web Portal (Next.js 16):** Kết nối giao tiếp qua Axios Client, tự động cập nhật dữ liệu rác, lịch gom và hiển thị bản đồ Leaflet.
* **EcoGom Mobile App (React Native & Expo 54):** Cung cấp các endpoints nhẹ, tối ưu hóa băng thông di động cho người dân tra cứu lịch gom theo thời gian thực.
* **Swagger OpenAPI:** Cung cấp tài liệu định nghĩa chuẩn giúp các nền tảng khách hàng đồng bộ kiểu dữ liệu một cách an toàn.

---

## 7. Tác giả

Được phát triển bởi **Mr.T (hvt299)**  
GitHub: [https://github.com/hvt299](https://github.com/hvt299)
