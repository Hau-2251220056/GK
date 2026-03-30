import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Items() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/items`, { timeout: 5000 });
      setItems(response.data.items || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching items:", err);
      setError("Không thể tải danh sách. Vui lòng kiểm tra backend.");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();

    if (!newItem.trim()) {
      setError("Vui lòng nhập tên mục.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/items`,
        { name: newItem },
        { timeout: 5000 },
      );

      // Create new item object with the response data
      const newItemData = {
        id: response.data.id,
        name: response.data.name,
        created_at: new Date().toISOString(),
      };

      setItems([newItemData, ...items]);
      setNewItem("");
      setSuccess("Mục được thêm thành công!");
      setError(null);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Error adding item:", err);
      setError("Không thể thêm mục. Vui lòng thử lại.");
    }
  };

  return (
    <div className="items-container">
      <h2>Danh Sách Mục</h2>

      <form className="add-item-form" onSubmit={handleAddItem}>
        <input
          type="text"
          placeholder="Nhập tên mục mới..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          Thêm Mục
        </button>
      </form>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      {loading ? (
        <div className="loading">
          <p>Đang tải dữ liệu...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="empty-state">
          <p>Không có mục nào. Hãy thêm mục mới!</p>
        </div>
      ) : (
        <ul className="items-list">
          {items.map((item) => (
            <li key={item.id}>
              <span>{item.name}</span>
              <small>{new Date(item.created_at).toLocaleString("vi-VN")}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
