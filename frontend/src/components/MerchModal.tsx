import React, { useState } from 'react';
import {
  X,
  Instagram,
  Check,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  CreditCard,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Plus,
  Minus,
  Phone,
  Mail,
  User,
  MapPin,
} from 'lucide-react';
import { MerchItem } from '../content/merchData';

interface MerchModalProps {
  item: MerchItem | null;
  onClose: () => void;
}

export const MerchModal: React.FC<MerchModalProps> = ({ item, onClose }) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('L');
  const [quantity, setQuantity] = useState<number>(1);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!item) return null;

  const currentImage = item.gallery[activeImageIdx] || item.image;
  const isComboImage =
    currentImage.includes('full-package') || currentImage.includes('Set-troja-keps');
  const totalPrice = item.price * quantity;
  const sizeText = item.sizes ? selectedSize : 'One Size (Justerbar)';

  // Instagram direct message fallback link
  const dmText = encodeURIComponent(
    `Tjena! Jag vill beställa: ${quantity}x ${item.title} (${sizeText}) - Totalt: ${totalPrice} kr. Mitt namn: ${name || '[Ange namn]'}`
  );
  const instagramDmUrl = `https://ig.me/m/grabbarna.futsal?text=${dmText}`;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev > 0 ? prev - 1 : item.gallery.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev < item.gallery.length - 1 ? prev + 1 : 0));
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(10, prev + delta)));
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim() || !phone.trim() || !email.trim()) {
      setErrorMessage('Vänligen fyll i namn, telefonnummer och e-postadress.');
      return;
    }

    setSubmitting(true);

    try {
      // 1. Försök först med Resend via vår /api/order backend för ett 100% designat HTML-kvitto
      const orderPayload = {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        product: item.title,
        size: sizeText,
        quantity,
        unit_price: `${item.price} kr`,
        total_price: `${totalPrice} kr`,
        message: message.trim() || 'Överlämning i Trollhättan / standard',
      };

      try {
        const apiRes = await fetch('/api/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderPayload),
        });
        const apiData = await apiRes.json();
        if (apiRes.ok && apiData.success) {
          setOrderSuccess(true);
          return;
        }
      } catch (apiErr) {
        console.warn('Resend /api/order svarade inte, provar Web3Forms fallback:', apiErr);
      }

      // 2. Säker fallback via Web3Forms (utan emojis i nycklar för att undvika encoding-fel)
      const formData = new FormData();
      formData.append('access_key', '2af91ffb-65f5-4e9a-99cf-f1653c3a6ed0');
      formData.append(
        'subject',
        `Bestallning: ${quantity}x ${item.title} (${sizeText}) - ${totalPrice} kr [${name.trim()}]`
      );
      formData.append('from_name', 'Futsal Boys Klubbshop');
      formData.append('replyto', email.trim());

      formData.append('Kund', name.trim());
      formData.append('Telefon', phone.trim());
      formData.append('E-post', email.trim());
      formData.append('Vara', `${quantity} st ${item.title}`);
      formData.append('Storlek', sizeText);
      formData.append('Styckpris', `${item.price} kr`);
      formData.append('Totalt att betala', `${totalPrice} kr`);
      formData.append('Betalning', 'Swish till 0762287601 (Mark med ditt namn)');
      formData.append(
        'Leverans eller meddelande',
        message.trim() ? message.trim() : 'Overlamning i Trollhattan / standard'
      );

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setOrderSuccess(true);
      } else {
        setErrorMessage(
          data.message || 'Kunde inte skicka beställningen. Prova igen eller skriv på Instagram DM.'
        );
      }
    } catch (err) {
      setErrorMessage(
        'Ett nätverksfel uppstod. Kontrollera din uppkoppling eller beställ via Instagram DM.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setOrderSuccess(false);
    setErrorMessage(null);
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
    setQuantity(1);
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(5, 7, 10, 0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto',
      }}
    >
      <div
        className="merch-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#0c1016',
          border: '1px solid rgba(16, 255, 96, 0.35)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 40px rgba(16, 255, 96, 0.2)',
          borderRadius: '22px',
          maxWidth: '890px',
          width: '100%',
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 1fr) minmax(320px, 1.25fr)',
          maxHeight: 'min(93vh, 760px)',
          overflow: 'hidden',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Stäng modal"
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(0, 0, 0, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 30,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--neon-green)';
            e.currentTarget.style.color = '#000000';
            e.currentTarget.style.borderColor = 'var(--neon-green)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.75)';
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
          }}
        >
          <X size={18} />
        </button>

        {/* Left Column: Image Gallery & Product Highlights */}
        <div
          className="merch-modal-left"
          style={{
            background: '#070a0e',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '20px',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            minHeight: 0,
            overflowY: 'auto',
          }}
        >
          {/* Main Photo View */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '360px',
              aspectRatio: '1 / 1',
              margin: '0 auto',
              borderRadius: '16px',
              overflow: 'hidden',
              background: isComboImage ? '#ffffff' : '#0a0e14',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
            }}
          >
            <img
              src={currentImage}
              alt={item.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: isComboImage ? 'contain' : 'cover',
                padding: isComboImage ? '10px' : '0',
                display: 'block',
              }}
            />

            {item.badge && (
              <span
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: item.badgeType === 'value' ? '#ff9900' : 'var(--neon-green)',
                  color: '#07090b',
                  fontSize: '10.5px',
                  fontWeight: 900,
                  letterSpacing: '0.08em',
                  padding: '4px 9px',
                  borderRadius: '6px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.35)',
                  zIndex: 2,
                }}
              >
                {item.badge}
              </span>
            )}

            {/* Gallery Navigation arrows */}
            {item.gallery.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  aria-label="Föregående bild"
                  style={{
                    position: 'absolute',
                    left: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.65)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 2,
                  }}
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  onClick={handleNext}
                  aria-label="Nästa bild"
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.65)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 2,
                  }}
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {item.gallery.length > 1 && (
            <div
              style={{
                display: 'flex',
                gap: '8px',
                marginTop: '14px',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              {item.gallery.map((img, idx) => {
                const isThumbCombo =
                  img.includes('full-package') || img.includes('Set-troja-keps');
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border:
                        activeImageIdx === idx
                          ? '2px solid var(--neon-green)'
                          : '1px solid rgba(255, 255, 255, 0.15)',
                      background: isThumbCombo ? '#ffffff' : '#0a0e14',
                      cursor: 'pointer',
                      padding: 0,
                      opacity: activeImageIdx === idx ? 1 : 0.6,
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <img
                      src={img}
                      alt=""
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: isThumbCombo ? 'contain' : 'cover',
                        padding: isThumbCombo ? '2px' : '0',
                      }}
                    />
                  </button>
                );
              })}
            </div>
          )}

          {/* Product Bullet highlights on left */}
          <div style={{ marginTop: '16px', padding: '0 8px' }}>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              {item.features.slice(0, 3).map((feat, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '7px',
                    fontSize: '11.5px',
                    color: 'var(--silver-dim)',
                  }}
                >
                  <Check size={12} color="var(--neon-green)" style={{ flexShrink: 0 }} />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Order Form or Success Screen */}
        <div
          className="merch-modal-right"
          style={{
            padding: '24px 26px',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            maxHeight: '100%',
            overflowY: 'auto',
          }}
        >
          {orderSuccess ? (
            /* ==========================================================
               SUCCESS SCREEN AFTER ORDER IS SENT VIA WEB3FORMS
               ========================================================== */
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '20px 8px',
                margin: 'auto 0',
              }}
            >
              <div
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  background: 'rgba(16, 255, 96, 0.15)',
                  border: '2px solid var(--neon-green)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--neon-green)',
                  marginBottom: '16px',
                  boxShadow: '0 0 25px rgba(16, 255, 96, 0.35)',
                }}
              >
                <CheckCircle2 size={38} />
              </div>

              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  color: 'var(--neon-green)',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}
              >
                BESTÄLLNING MOTTAGEN!
              </span>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '28px',
                  color: '#ffffff',
                  margin: '0 0 8px',
                  lineHeight: 1.15,
                }}
              >
                TACK FÖR DITT KÖP, {name.toUpperCase()}! 🎉
              </h3>

              <p
                style={{
                  color: 'var(--silver-dim)',
                  fontSize: '13.5px',
                  lineHeight: 1.5,
                  maxWidth: '440px',
                  margin: '0 0 20px',
                }}
              >
                Din beställning på{' '}
                <strong style={{ color: '#fff' }}>
                  {quantity} st {item.title} ({sizeText})
                </strong>{' '}
                har skickats direkt till klubbledningen på e-post!
              </p>

              {/* Swish Payment Card */}
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(16, 255, 96, 0.12) 0%, rgba(13, 19, 27, 0.95) 100%)',
                  border: '1.5px solid var(--neon-green)',
                  borderRadius: '16px',
                  padding: '18px 20px',
                  width: '100%',
                  maxWidth: '440px',
                  marginBottom: '22px',
                  textAlign: 'left',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '10px',
                  }}
                >
                  <CreditCard size={20} color="var(--neon-green)" />
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: 800,
                      color: '#ffffff',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    SLUTFÖR MED SWISH:
                  </span>
                </div>

                <div style={{ fontSize: '13px', color: '#e0e6ed', lineHeight: 1.6 }}>
                  <div>
                    1. Öppna Swish och swisha beloppet:{' '}
                    <strong style={{ color: 'var(--neon-green)', fontSize: '17px' }}>
                      {totalPrice} kr
                    </strong>
                  </div>
                  <div>
                    2. Swishnummer:{' '}
                    <strong
                      style={{
                        color: '#ffffff',
                        fontSize: '16px',
                        letterSpacing: '0.04em',
                        userSelect: 'all',
                      }}
                    >
                      0762287601
                    </strong>{' '}
                    (Raffi / Futsal Boys)
                  </div>
                  <div>
                    3. Meddelande:{' '}
                    <strong style={{ color: '#ffffff' }}>
                      {name || 'Ditt namn'} – {item.title}
                    </strong>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '440px' }}>
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn btn--outline"
                  style={{ flex: 1, padding: '11px', fontSize: '13px' }}
                >
                  Gör en ny beställning
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn--neon"
                  style={{ flex: 1, padding: '11px', fontSize: '13px' }}
                >
                  Klart & Stäng
                </button>
              </div>
            </div>
          ) : (
            /* ==========================================================
               MERCH ORDER FORM (WEB3FORMS + SWISH)
               ========================================================== */
            <form onSubmit={handleOrderSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Product Header */}
              <div style={{ marginBottom: '14px' }}>
                <span
                  style={{
                    fontSize: '10.5px',
                    fontWeight: 800,
                    letterSpacing: '0.12em',
                    color: 'var(--neon-green)',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    marginBottom: '3px',
                  }}
                >
                  <Sparkles size={12} />
                  <span>OFFICIELL KLUBBSHOP</span>
                </span>

                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '24px',
                    color: '#ffffff',
                    margin: '0 0 2px',
                    lineHeight: 1.15,
                    letterSpacing: '0.04em',
                  }}
                >
                  {item.title}
                </h2>

                <p
                  style={{
                    color: 'var(--silver-dim)',
                    fontSize: '12.5px',
                    margin: 0,
                    lineHeight: 1.3,
                  }}
                >
                  {item.subtitle}
                </p>
              </div>

              {/* Price & Quantity Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  marginBottom: '14px',
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '26px',
                      fontWeight: 900,
                      color: 'var(--neon-green)',
                      letterSpacing: '0.02em',
                      lineHeight: 1,
                    }}
                  >
                    {totalPrice} kr
                  </span>
                  {quantity > 1 && (
                    <span
                      style={{
                        fontSize: '11px',
                        color: 'var(--silver-dim)',
                        marginLeft: '8px',
                      }}
                    >
                      ({item.price} kr/st)
                    </span>
                  )}
                </div>

                {/* Quantity Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '11.5px', color: 'var(--silver-dim)', fontWeight: 700 }}>
                    ANTAL:
                  </span>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: 'rgba(0, 0, 0, 0.4)',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      style={{
                        width: '30px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'none',
                        border: 'none',
                        color: quantity <= 1 ? 'rgba(255,255,255,0.2)' : '#ffffff',
                        cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
                      }}
                    >
                      <Minus size={14} />
                    </button>
                    <span
                      style={{
                        width: '26px',
                        textAlign: 'center',
                        fontWeight: 900,
                        fontSize: '14px',
                        color: '#ffffff',
                      }}
                    >
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= 10}
                      style={{
                        width: '30px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'none',
                        border: 'none',
                        color: '#ffffff',
                        cursor: 'pointer',
                      }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Size Selector if clothing */}
              {item.sizes && item.sizes.length > 0 && (
                <div style={{ marginBottom: '14px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '6px',
                    }}
                  >
                    <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#ffffff' }}>
                      VÄLJ STORLEK:
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--silver-dim)' }}>
                      Unisex standard
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {item.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        style={{
                          width: '42px',
                          height: '36px',
                          borderRadius: '8px',
                          border:
                            selectedSize === s
                              ? '2px solid var(--neon-green)'
                              : '1px solid rgba(255, 255, 255, 0.15)',
                          background:
                            selectedSize === s
                              ? 'rgba(16, 255, 96, 0.18)'
                              : 'rgba(255, 255, 255, 0.04)',
                          color: selectedSize === s ? 'var(--neon-green)' : '#ffffff',
                          fontWeight: 800,
                          fontSize: '12.5px',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Customer Input Fields */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  marginBottom: '14px',
                }}
              >
                {/* Name */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '11px',
                      fontWeight: 800,
                      color: '#ffffff',
                      marginBottom: '4px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    DITT FÖR- OCH EFTERNAMN <span style={{ color: 'var(--neon-green)' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      name="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="t.ex. Alex Lindberg"
                      style={{
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '8px',
                        padding: '9px 12px 9px 34px',
                        color: '#ffffff',
                        fontSize: '13px',
                        outline: 'none',
                        transition: 'border-color 0.2s ease',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--neon-green)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)')}
                    />
                    <User
                      size={14}
                      color="var(--silver-dim)"
                      style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)' }}
                    />
                  </div>
                </div>

                {/* Phone & Email side-by-side */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {/* Phone */}
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '11px',
                        fontWeight: 800,
                        color: '#ffffff',
                        marginBottom: '4px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      TELEFON (SWISH) <span style={{ color: 'var(--neon-green)' }}>*</span>
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="07X-XXXXXXX"
                        style={{
                          width: '100%',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: '8px',
                          padding: '9px 10px 9px 32px',
                          color: '#ffffff',
                          fontSize: '13px',
                          outline: 'none',
                          transition: 'border-color 0.2s ease',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = 'var(--neon-green)')}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)')}
                      />
                      <Phone
                        size={14}
                        color="var(--silver-dim)"
                        style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '11px',
                        fontWeight: 800,
                        color: '#ffffff',
                        marginBottom: '4px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      E-POSTADRESS <span style={{ color: 'var(--neon-green)' }}>*</span>
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="din@epost.se"
                        style={{
                          width: '100%',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: '8px',
                          padding: '9px 10px 9px 32px',
                          color: '#ffffff',
                          fontSize: '13px',
                          outline: 'none',
                          transition: 'border-color 0.2s ease',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = 'var(--neon-green)')}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)')}
                      />
                      <Mail
                        size={14}
                        color="var(--silver-dim)"
                        style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery / Address / Note */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '11px',
                      fontWeight: 800,
                      color: '#ffffff',
                      marginBottom: '4px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    LEVERANSADRESS / MEDDELANDE (VALFRITT)
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="t.ex. Gatuadress, eller möts i hallen / Trollhättan"
                      style={{
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '8px',
                        padding: '9px 12px 9px 34px',
                        color: '#ffffff',
                        fontSize: '13px',
                        outline: 'none',
                        transition: 'border-color 0.2s ease',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--neon-green)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)')}
                    />
                    <MapPin
                      size={14}
                      color="var(--silver-dim)"
                      style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)' }}
                    />
                  </div>
                </div>
              </div>

              {/* Swish Notice Card */}
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, rgba(16, 255, 96, 0.1) 0%, rgba(20, 26, 36, 0.85) 100%)',
                  border: '1px solid rgba(16, 255, 96, 0.35)',
                  marginBottom: '14px',
                  fontSize: '12px',
                  lineHeight: 1.45,
                  color: '#e4f9ec',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, color: 'var(--neon-green)', marginBottom: '2px' }}>
                  <CreditCard size={15} />
                  <span>BETALNING VIA SWISH:</span>
                </div>
                <div>
                  Swisha <strong style={{ color: 'var(--neon-green)' }}>{totalPrice} kr</strong> till{' '}
                  <strong style={{ color: '#ffffff', userSelect: 'all' }}>0762287601</strong> (Raffi Medz / Futsal Boys). Märk betalningen med ditt namn!
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(255, 60, 60, 0.12)',
                    border: '1px solid rgba(255, 60, 60, 0.4)',
                    color: '#ff8080',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    marginBottom: '12px',
                  }}
                >
                  <AlertCircle size={15} style={{ flexShrink: 0 }} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={submitting}
                className="btn btn--neon"
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '13px 18px',
                  fontSize: '14px',
                  fontWeight: 900,
                  borderRadius: '10px',
                  boxShadow: '0 8px 24px rgba(16, 255, 96, 0.35)',
                  cursor: submitting ? 'wait' : 'pointer',
                  opacity: submitting ? 0.7 : 1,
                  marginBottom: '10px',
                }}
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="spin-animation" />
                    <span>SKICKAR BESTÄLLNING...</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={17} />
                    <span>SKICKA BESTÄLLNING ({totalPrice} KR)</span>
                  </>
                )}
              </button>

              {/* Alternative: Order via Instagram DM */}
              <div
                style={{
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <a
                  href={instagramDmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 'clamp(10.5px, 2.7vw, 12px)',
                    color: 'var(--silver-dim)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px',
                    whiteSpace: 'nowrap',
                    transition: 'color 0.2s ease',
                    maxWidth: '100%',
                    lineHeight: 1.2,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--neon-green)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--silver-dim)')}
                >
                  <Instagram size={13} style={{ flexShrink: 0 }} />
                  <span>Beställ via Instagram DM? Klicka här</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
