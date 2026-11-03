import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { EventFormData, EventFormErrors, Category } from "../../types/campus-event";
import { validateEvent } from "../../utils/validate-event";

interface EventFormProps {
  initialData: EventFormData;
  submitText: string;
  onSubmit: (data: EventFormData) => void;
}

function EventForm({ initialData, submitText, onSubmit }: EventFormProps) {
  const [data, setData] = useState<EventFormData>(initialData);
  const [errors, setErrors] = useState<EventFormErrors>({});

  const categories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateEvent(data);
    setErrors(found);
    
    // Eğer hata nesnesinin içi boşsa (yani sıfır hata varsa) formu gönder
    if (Object.keys(found).length === 0) {
      onSubmit(data);
    }
  }

  return (
    // noValidate ile tarayıcının varsayılan hata baloncuklarını kapatıyoruz
    <form className="etkinlik-formu" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="title">Etkinlik Adı</label>
        <input 
          id="title" name="title" value={data.title} onChange={handleChange}
          aria-invalid={errors.title ? true : undefined}
        />
        {errors.title && <span className="hata-metni">{errors.title}</span>}
      </div>

      <div>
        <label htmlFor="category">Kategori</label>
        <select 
          id="category" name="category" value={data.category} onChange={handleChange}
          aria-invalid={errors.category ? true : undefined}
        >
          <option value="">Seçiniz...</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        {errors.category && <span className="hata-metni">{errors.category}</span>}
      </div>

      <div>
        <label htmlFor="date">Tarih</label>
        <input type="date" id="date" name="date" value={data.date} onChange={handleChange} aria-invalid={errors.date ? true : undefined} />
        {errors.date && <span className="hata-metni">{errors.date}</span>}
      </div>

      <div>
        <label htmlFor="time">Saat</label>
        <input type="time" id="time" name="time" value={data.time} onChange={handleChange} aria-invalid={errors.time ? true : undefined} />
        {errors.time && <span className="hata-metni">{errors.time}</span>}
      </div>

      <div>
        <label htmlFor="location">Yer</label>
        <input id="location" name="location" value={data.location} onChange={handleChange} aria-invalid={errors.location ? true : undefined} />
        {errors.location && <span className="hata-metni">{errors.location}</span>}
      </div>

      <div>
        <label htmlFor="capacity">Kontenjan</label>
        <input type="number" id="capacity" name="capacity" value={data.capacity} onChange={handleChange} aria-invalid={errors.capacity ? true : undefined} />
        {errors.capacity && <span className="hata-metni">{errors.capacity}</span>}
      </div>

      <div>
        <label htmlFor="description">Açıklama</label>
        <textarea id="description" name="description" value={data.description} onChange={handleChange} aria-invalid={errors.description ? true : undefined} rows={4} />
        {errors.description && <span className="hata-metni">{errors.description}</span>}
      </div>

      <button type="submit" className="buton">{submitText}</button>
    </form>
  );
}

export default EventForm;