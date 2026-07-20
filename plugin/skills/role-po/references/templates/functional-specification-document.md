# Functional Specification Document (FSD)

> Verbatim conversion of the handbook DOCX template `assets/templates/**/functional-specification-document.docx` (Vietnamese-first; keep `[ĐIỀN: ...]` placeholders that the user has not answered).

### TÀI LIỆU ĐẶC TẢ CHỨC NĂNG (FUNCTIONAL SPECIFICATION DOCUMENT)

| Hạng mục | Nội dung chi tiết |
|---|---|
| Tên Dự án |  |
| Mã Dự án | [Mã số quản lý nội bộ] |
| Phiên bản |  |
| Trạng thái |  |
| Ngày cập nhật |  |

#### **Phê duyệt**

| Ngày phê duyệt | Phiên bản đã phê duyệt | Vai trò người phê duyệt | Người phê duyệt |
|---|---|---|---|

### 1. Giới thiệu

< Xác định và mô tả nhu cầu kinh doanh hoặc vấn đề mà tài liệu này giải quyết. Bao gồm thông tin nền.>

#### 1.1 Mục đích của tài liệu

< Mô tả tài liệu Đặc tả Chức năng và mục đích dự kiến đối với người đọc. Dưới đây là mục đích chuẩn của FSD, điều chỉnh nếu cần.>

Tài liệu Đặc tả Chức năng cung cấp chi tiết về cách giải pháp hệ thống hoạt động và hành vi yêu cầu. Nó dựa trên các yêu cầu cấp cao trong Tài liệu Yêu cầu Kinh doanh và cho phép truy xuất các đặc tả chức năng về yêu cầu kinh doanh. Bao gồm yêu cầu chức năng chi tiết, trường hợp sử dụng, đầu vào và đầu ra, luồng quy trình, sơ đồ và mô phỏng.

#### 1.2 Phạm vi dự án

<Mô tả phạm vi dự án giải quyết nhu cầu hoặc vấn đề kinh doanh. Bao gồm thông tin cấp cao về giải pháp>.

#### 1.3 Phạm vi của tài liệu

<Nếu có nhiều tài liệu FSD cho dự án, mô tả phạm vi cụ thể của tài liệu này. Mục 1.2 và 1.3 có thể kết hợp>.

#### 1.4 Tài liệu liên quan

<Thêm tài liệu liên quan đến FSD như Dự thảo Dự án, Tài liệu Yêu cầu Kinh doanh, v.v.>.

| Thành phần | Tên (với liên kết đến tài liệu) | Mô tả |
|---|---|---|

#### 1.5 Thuật ngữ/ Từ viết tắt và Định nghĩa

<Nêu thuật ngữ và định nghĩa trong đặc tả chức năng. Bao gồm từ viết tắt trong tài liệu.>

| Thuật ngữ/ Từ viết tắt | Định nghĩa | Mô tả |
|---|---|---|

#### 1.6 Rủi ro và Giả định

<Liệt kê yếu tố giả định và rủi ro ảnh hưởng đến thiết kế chức năng hệ thống. Bao gồm thành phần bên thứ ba, môi trường vận hành hoặc giới hạn.>

### 2. Tổng quan hệ thống/giải pháp

<Mô tả ngắn gọn phần mềm và giải pháp, mục đích, lợi ích và mục tiêu.>

#### 2.1. Sơ đồ ngữ cảnh/giao diện/luồng dữ liệu, luồng màn hình ứng dụng, sơ đồ trang web, luồng quy trình

<Cung cấp biểu diễn đồ họa liên quan đến hệ thống và dự án như sơ đồ ngữ cảnh, giao diện, luồng dữ liệu, luồng màn hình, sơ đồ trang web hoặc luồng quy trình.>

#### 2.2. Diễn viên hệ thống

##### 2.2.1. Vai trò người dùng và trách nhiệm / yêu cầu quyền hạn

| Người dùng/Vai trò | Ví dụ | Tần suất sử dụng | Bảo mật/Truy cập, Tính năng sử dụng | Ghi chú bổ sung |
|---|---|---|---|---|
| <bao gồm người dùng/vai trò cụ thể như Quản lý Mua hàng, Quản trị viên Bộ phận, Giảng viên, Sinh viên, v.v> | <bao gồm ví dụ về những người thực tế trong vai trò> | <mô tả tần suất họ sử dụng hệ thống. Nêu Thường xuyên, Thỉnh thoảng hoặc Hiếm> | <mô tả các tính năng hệ thống có sẵn cho vai trò và quyền truy cập cần nêu> | <thêm ghi chú bổ sung hoặc tài liệu hỗ trợ cần thiết> |

#### 2.3. Phụ thuộc và tác động thay đổi

##### 2.3.1. Phụ thuộc hệ thống

<Liệt kê và xác định phụ thuộc của giải pháp đề xuất với các hệ thống khác.>

##### 2.3.2. Tác động thay đổi

<Liệt kê và xác định hệ thống hiện có bị ảnh hưởng bởi triển khai giải pháp đề xuất.>

### 3. Đặc tả chức năng

<Bắt đầu mô tả các đặc tả liên quan đến hệ thống tổng thể. Có thể tạo bảng/ chỉ mục các chức năng và liên kết đến các mục dưới đây>

<Nếu không có tài liệu tham chiếu/truy xuất riêng cho dự án, sử dụng phần này để ánh xạ yêu cầu kinh doanh, trường hợp sử dụng, yêu cầu chức năng và kiểm thử>

<Phân nhóm đặc tả chức năng phù hợp dự án. Có thể chia theo màn hình, khu vực chức năng, vai trò người dùng, vé JIRA hoặc chức năng cấp cao và chi tiết>

#### 3.1 <Tiêu đề>

##### 3.1.1 Mục đích/Mô tả

<Mô tả cấp cao và mục đích các đặc tả trong phần này.>

##### 3.1.2 Trường hợp sử dụng

<Ánh xạ yêu cầu chức năng với trường hợp sử dụng trong tài liệu Yêu cầu Kinh doanh. Nếu không có mô tả chi tiết, mô tả trường hợp sử dụng tại đây. Thường gồm các yếu tố trong bảng sau.>

| UC-1 | <Tên trường hợp sử dụng> |
|---|---|
| Diễn viên chính | <diễn viên chính tham gia trường hợp sử dụng này> |
| Các bên liên quan và mối quan tâm | <Mô tả các bên liên quan khác> |
| Kích hoạt | <Điều kiện/hành động khởi đầu trường hợp sử dụng> |
| Điều kiện tiên quyết | <Điều kiện giả định đúng trước bước đầu tiên> |
| Điều kiện sau khi thực hiện | <Điều kiện sau khi trường hợp sử dụng thành công> |
| Kịch bản thành công chính | <thăm điểm BẮT ĐẦU Bước Bước Đảm bảo MỤC TIÊU ĐẠT ĐƯỢC> |
| Phần mở rộng | Nếu Điều kiện, thì Các bước thay thế <Liệt kê các bước/kịch bản mở rộng ngoài kịch bản thành công chính.> |
| Ưu tiên | <chỉ ra ưu tiên cao, trung bình hoặc thấp> |
| Yêu cầu đặc biệt | <Yêu cầu đặc biệt liên quan đến hệ thống để hoàn thành trường hợp sử dụng> |
| Câu hỏi mở | <Ghi chú và câu hỏi> |

##### 3.1.3 Mô phỏng

<Cung cấp mô phỏng chức năng hoặc toàn bộ trang>

##### 3.1.4 Yêu cầu chức năng

<Mô tả chi tiết cấp trang không có trong mục 3.1.5. Bao gồm yêu cầu liên quan đến Menu Điều hướng, Hành động, trạng thái giao dịch, xác minh và xác thực, v.v.

Đảm bảo mỗi đặc tả có số tham chiếu và được giải thích theo định dạng sau.>

| Mã đặc tả | Mô tả đặc tả | Quy tắc kinh doanh/Phụ thuộc dữ liệu |
|---|---|---|
| <Mã định danh đặc tả> | <Giải thích ngắn gọn về đặc tả> | <Bất kỳ quy tắc xác thực hoặc quy tắc kinh doanh nào> |

<Lưu ý: Mục 3.1.4 và 3.1.5 có thể kết hợp nếu có vài chức năng trên một trang>

##### 3.1.5 Đặc tả cấp trường

<Chỉ định tất cả phần tử dữ liệu trường liên quan đến yêu cầu chức năng trong hai bảng dưới đây.>

**Các phần tử biểu mẫu:**

| Gọi ra | Tên trường dữ liệu | Điều khiển giao diện người dùng | Bắt buộc? | Có thể chỉnh sửa | Loại dữ liệu | Bộ giá trị | Giá trị mặc định | Ví dụ dữ liệu | Nguồn dữ liệu |
|---|---|---|---|---|---|---|---|---|---|
| <tham chiếu mô phỏng> | <Tên nhãn> | <chỉ định điều khiển giao diện người dùng trên màn hình> | <chỉ định nếu trường bắt buộc> | <chỉ định nếu trường có thể chỉnh sửa> | <Chỉ định loại dữ liệu sử dụng cho trường này> | <Nếu giá trị thuộc bộ, chỉ định toàn bộ bộ giá trị> | <Chỉ định nếu trường mặc định giá trị nào> | <Cung cấp ví dụ dữ liệu> | <Chỉ định nguồn dữ liệu> |
| Ví dụ: Gọi ra 1 | Tên người dùng | hộp văn bản | Có | Có | Chữ và số | không | Không áp dụng | agujar | Nhập liệu người dùng |

**Quy tắc kinh doanh và phụ thuộc biểu mẫu:Nút bấm, liên kết và biểu tượng:**

| Nhãn nút bấm, liên kết, biểu tượng | Sự kiện OnClick | Sự kiện khác | Hiển thị | Bật vs Tắt | Điều hướng đến | Xác thực | Phụ thuộc |
|---|---|---|---|---|---|---|---|
| <Tên nhãn nút bấm> | <Chỉ định thao tác khi sự kiện on-click xảy ra> | <Chỉ định thao tác khi các sự kiện khác xảy ra> | <Chỉ định trạng thái hiển thị mặc định của nút bấm> | <Chỉ định nút bấm bật hay tắt và điều kiện nếu có> | <Chỉ định liên kết trang chuyển hướng nếu có> | <Chỉ định quy tắc xác thực khi vận hành nút bấm> | <Nêu rõ nếu có phụ thuộc với phần tử biểu mẫu hoặc nút bấm khác> |
| Ví dụ: Gửi | Xác minh tên người dùng và mật khẩu đúng. Nếu đúng, đăng nhập người dùng. | Khi rê chuột hiển thị thông báo: “Vui lòng cung cấp thông tin xác thực web để đăng nhập” | Có, luôn luôn | Tắt, mặc định. Bật, sau khi nhập phím đầu tiên ở trường tên người dùng hoặc mật khẩu. | Trang Bảng điều khiển người dùng | Xác minh tên người dùng là ID sunet hợp lệ và mật khẩu khớp với dữ liệu đăng ký. | Vô hiệu hóa chức năng Người dùng mới trên các trang tiếp theo nếu người dùng đăng nhập qua nút này. |

### 4. Cấu hình hệ thống

<Tổng quan các bước hoặc thiết lập cần thiết để cấu hình ứng dụng/chương trình. Nêu rõ mục đích đằng sau mỗi thiết lập. Thảo luận về lựa chọn thay thế, tùy chỉnh, giải pháp tạm thời, điều kiện và phụ thuộc. Với ứng dụng Oracle, liệt kê BR100 hoặc tài liệu thiết lập ứng dụng áp dụng>

### 5. Yêu cầu hệ thống khác/Yêu cầu phi chức năng

<Phần này ghi các chi tiết bổ sung về chất lượng và hành vi hệ thống ngoài yêu cầu chức năng. Ghi lại kỳ vọng ngầm của các bên liên quan về hiệu suất trong hoàn cảnh nhất định. Nêu SLA về thời gian phản hồi, hiệu suất, độ trễ, quản lý sự cố, bảo mật, sao lưu, tuân thủ pháp lý, v.v. Thuật ngữ ‘hệ thống’ bao gồm tích hợp với nền tảng di động, thiết bị di động, máy tính bảng và điện thoại thông minh.>

=> Có thể lấy bên BRD để bổ sung tham khảo

### 6. Yêu cầu báo cáo

<Ghi nhu cầu báo cáo, bao gồm phạm vi, định dạng, phần tử dữ liệu, nội dung, loại tệp, cơ chế trích xuất, người dùng, mức độ truy cập, tần suất, v.v. Cung cấp mô phỏng báo cáo nếu cần. Tạo tài liệu riêng nếu cần.>

### 7. Yêu cầu tích hợp

<Xác định nhu cầu tích hợp và nêu giao diện với phần cứng, phần mềm và người dùng bên ngoài giải pháp. Bao gồm sơ đồ tổng quan kiến trúc, sơ đồ luồng dữ liệu cấp cao, cấu trúc bảng, giao thức giao diện, API, điều kiện lỗi, xác thực lỗi, nhắn tin, xử lý tự động, v.v. Có thể nêu phụ thuộc phần cứng/phần mềm, yêu cầu nâng cấp, vấn đề tương thích với khung và giải pháp hiện có.>

(Sơ đồ luồng dữ liệu, sơ đồ giao diện – nếu cần thiết)

#### 7.1 Xử lý ngoại lệ/Báo cáo lỗi

<Giải thích điều kiện lỗi/ngoại lệ thường xảy ra trong giao diện hoặc tích hợp hệ thống chéo. Giải thích bản chất, mã lỗi, nguyên nhân gốc rễ và chiến lược xử lý. Chỉ ra chương trình tự động xử lý bản ghi lỗi hoặc điều kiện lỗi. Nêu nếu có báo cáo lỗi hoặc thông báo cảnh báo nhóm hỗ trợ và quản trị viên hệ thống khi lỗi hoặc gián đoạn giao diện>

| Mã ngoại lệ/Lỗi | Lỗi | Nguyên nhân | Chiến lược giải pháp |
|---|---|---|---|

### 8. Yêu cầu di cư/chuyển đổi dữ liệu

<Giải thích kế hoạch chuyển đổi dữ liệu. Cung cấp thông tin nhận dạng cho hệ thống tự động, ứng dụng hoặc tình huống áp dụng kế hoạch. Mô tả giả định, giới hạn hoặc rủi ro liên quan đến chuyển đổi dữ liệu. (Chi tiết trong mục 1.6)>

#### 8.1 Chiến lược chuyển đổi dữ liệu

<Bao gồm chiến lược tổng thể cho chuyển đổi dữ liệu, cách và thời điểm thực hiện, phương pháp trích xuất, chuyển đổi, tải dữ liệu, lịch trình và kế hoạch kiểm tra>

#### 8.2 Chuẩn bị chuyển đổi dữ liệu

<Chi tiết điều kiện tiên quyết cho chuyển đổi. Thảo luận chiến lược sao lưu, quy trình phục hồi khi chuyển đổi thất bại.>

#### 8.3 Đặc tả chuyển đổi dữ liệu

| Nguồn | Phần tử dữ liệu nguồn | Đích | Phần tử dữ liệu đích | Quy tắc chuyển đổi | Ghi chú |
|---|---|---|---|---|---|
| <Vị trí nguồn> | <Mã định danh phần tử dữ liệu nguồn> | <Vị trí đích> | <Mã định danh phần tử dữ liệu đích> | <Mô tả quy tắc chuyển đổi dữ liệu> | <Ghi chú bổ sung> |

### 9. Tài liệu tham khảo

<Liệt kê tài liệu tham khảo bên ngoài dùng làm thông tin nền hoặc kiến thức cho FSD. Ví dụ: trang web tuân thủ, trang web Stanford, v.v>

### 10. Vấn đề mở

| Mã vấn đề | Vấn đề | Người nêu | Ngày nêu | Giải pháp/Quyết định | Người giải quyết | Ngày giải quyết | Trạng thái |
|---|---|---|---|---|---|---|---|

### Phụ lục
