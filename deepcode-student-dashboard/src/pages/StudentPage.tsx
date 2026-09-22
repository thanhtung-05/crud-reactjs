import React, { useState } from 'react';
import SideBar from "../components/SideBar";

// Dữ liệu mẫu ban đầu
const initialStudents = [
  { id: 1, name: 'Nguyễn Văn An', email: 'an.nguyen@example.com', age: 20, major: 'IT', createdAt: '12/06/2025 10:15' },
  { id: 2, name: 'Trần Thị Bình', email: 'binh.tran@example.com', age: 21, major: 'AI', createdAt: '12/06/2025 10:20' },
  { id: 3, name: 'Lê Văn Cường', email: 'cuong.le@example.com', age: 19, major: 'Software Engineering', createdAt: '11/06/2025 16:45' },
  { id: 4, name: 'Phạm Thị Dung', email: 'dung.pham@example.com', age: 22, major: 'Data Science', createdAt: '11/06/2025 14:32' },
  { id: 5, name: 'Hoàng Văn Em', email: 'em.hoang@example.com', age: 20, major: 'IT', createdAt: '10/06/2025 09:12' },
  { id: 6, name: 'Vũ Thị Hương', email: 'huong.vu@example.com', age: 21, major: 'AI', createdAt: '09/06/2025 18:20' },
  { id: 7, name: 'Đặng Văn Khánh', email: 'khanh.dang@example.com', age: 22, major: 'Web Development', createdAt: '08/06/2025 15:40' },
  { id: 8, name: 'Ngô Thị Lan', email: 'lan.ngo@example.com', age: 20, major: 'Design', createdAt: '07/06/2025 11:05' },
];

export default function StudentPage() {
  const [students, setStudents] = useState(initialStudents);
  const [formData, setFormData] = useState({ name: '', email: '', age: '', major: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [showToast, setShowToast] = useState(true);

  // Cập nhật input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Thêm sinh viên mới
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.age || !formData.major) return;

    const newStudent = {
      id: students.length + 1,
      name: formData.name,
      email: formData.email,
      age: Number(formData.age),
      major: formData.major,
      createdAt: new Date().toLocaleString('vi-VN'),
    };

    setStudents([newStudent, ...students]);
    setFormData({ name: '', email: '', age: '', major: '' });
    setShowToast(true);
  };

  // Reset form
  const handleReset = () => {
    setFormData({ name: '', email: '', age: '', major: '' });
  };

  // Xóa sinh viên
  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sinh viên này?')) {
      setStudents(students.filter((item) => item.id !== id));
    }
  };

  // Màu sắc Badge chuyên ngành
  const getMajorBadgeClass = (major) => {
    switch (major) {
      case 'IT': return 'bg-sky-100 text-sky-600';
      case 'AI': return 'bg-purple-100 text-purple-600';
      case 'Software Engineering': return 'bg-emerald-100 text-emerald-600';
      case 'Data Science': return 'bg-amber-100 text-amber-600';
      case 'Web Development': return 'bg-teal-100 text-teal-600';
      case 'Design': return 'bg-pink-100 text-pink-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  // Bộ lọc tìm kiếm
  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    // Bố cục Flexbox: SideBar nằm trái, Nội dung nằm phải
    <div className="flex min-h-screen bg-slate-100">
      
      {/* 2. Gọi SideBar ở cột bên trái */}
      <SideBar />

      {/* 3. Phần Nội dung Quản lý Sinh viên ở bên phải */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header trên cùng */}
        <header className="bg-white border-b border-slate-200 px-8 py-3 flex items-center justify-between">
          <div className="relative w-80">
            <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Tìm kiếm sinh viên theo tên, email..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src="https://ui-avatars.com/api/?name=Do+Pham+Thanh+Tung&background=f87171&color=fff"
                alt="Avatar"
                className="w-8 h-8 rounded-full border border-slate-200"
              />
              <span className="text-xs font-semibold text-slate-700">Đỗ Phạm Thanh Tùng</span>
            </div>
          </div>
        </header>

        {/* Nội dung chính */}
        <main className="p-6 space-y-6 text-slate-700 overflow-y-auto">
          {/* Header & Toast thông báo */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Quản lý sinh viên</h1>
              <p className="text-sm text-slate-500">Thêm, sửa, xóa và quản lý danh sách sinh viên</p>
            </div>

            {showToast && (
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg border border-emerald-200 text-sm shadow-sm">
                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Thêm sinh viên thành công!</span>
                <button onClick={() => setShowToast(false)} className="ml-2 hover:opacity-75">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Form Thêm sinh viên mới */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-slate-800 font-semibold text-base">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h2>Thêm sinh viên mới</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Họ tên *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Nhập họ tên"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Nhập email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Tuổi *</label>
                  <input
                    type="number"
                    name="age"
                    placeholder="Nhập tuổi"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Chuyên ngành *</label>
                  <select
                    name="major"
                    value={formData.major}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                    required
                  >
                    <option value="">Chọn chuyên ngành</option>
                    <option value="IT">IT</option>
                    <option value="AI">AI</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Design">Design</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Lưu sinh viên
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-medium px-4 py-2 rounded-lg transition"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Đặt lại
                </button>
              </div>
            </form>
          </div>

          {/* Bảng Danh sách sinh viên */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-800">
                Danh sách sinh viên ({filteredStudents.length})
              </h2>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 w-48"
                  />
                </div>
                <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </button>
                <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-2 rounded-lg">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Thêm sinh viên
                </button>
              </div>
            </div>

            {/* Bảng Dữ Liệu */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Họ tên</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Tuổi</th>
                    <th className="px-4 py-3">Chuyên ngành</th>
                    <th className="px-4 py-3">Ngày tạo</th>
                    <th className="px-4 py-3">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition">
                        <td className="px-4 py-3 font-medium text-slate-700">{item.id}</td>
                      <td className="px-4 py-3 font-medium text-slate-800">{item.name}</td>
                      <td className="px-4 py-3 text-slate-500">{item.email}</td>
                      <td className="px-4 py-3">{item.age}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${getMajorBadgeClass(item.major)}`}>
                          {item.major}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-400">{item.createdAt}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 rounded text-[11px] transition">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            Sửa
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-2.5 py-1 rounded text-[11px] transition"
                          >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Phân trang */}
            <div className="p-4 flex items-center justify-between border-t border-slate-100 text-xs text-slate-500">
              <span>
                Hiển thị 1 - {filteredStudents.length} trong tổng số {filteredStudents.length} sinh viên
              </span>

              <div className="flex items-center gap-1">
                <button className="p-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50" disabled>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="w-7 h-7 bg-blue-600 text-white font-medium rounded flex items-center justify-center">
                  1
                </button>
                <button className="p-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50" disabled>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

    </div>
  );
}
     