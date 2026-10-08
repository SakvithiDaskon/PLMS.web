import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';
import {
  GraduationCap,
  CreditCard,
  Phone,
  MessageCircle,
  UserCheck,
  User,
  BookOpen,
  Calendar,
  Clock,
  CheckCircle2,
  Mail,
  Pencil,
  Check,
  ChevronRight,
  Bell,
  Camera,
  X,
  Lock,
  AlertCircle,
  Upload,
  RefreshCw
} from 'lucide-react';
import gradCapTransparent from '../../assets/grad_cap_transparent.png';
import studentBoyClipArt from '../../assets/student_boy_clipart.png';
import studentGirlClipArt from '../../assets/student_girl_clipart.png';

// Illustrated student clip art avatars (Boy / Girl based on registered name)
const DEFAULT_MALE_AVATAR = studentBoyClipArt;
const DEFAULT_FEMALE_AVATAR = studentGirlClipArt;

// Detect whether a student's given name is female or male
const isFemaleStudentName = (name) => {
  if (!name || typeof name !== 'string') return false;
  const firstName = name.trim().toLowerCase().split(/\s+/)[0];

  const femaleNames = new Set([
    'nipuni', 'amali', 'sanduni', 'kavindi', 'chamari', 'hiruni', 'ananya', 'priya',
    'fatima', 'ayesha', 'sarah', 'sara', 'emma', 'olivia', 'chloe', 'maria', 'nethmi',
    'dewmi', 'kavya', 'shehani', 'ishara', 'thilini', 'kaveesha', 'rashmi', 'dinithi',
    'sachini', 'hansani', 'oshadi', 'sithara', 'tharushi', 'dilini', 'nadeesha', 'pooja',
    'hasini', 'imasha', 'madhavi', 'chathuri', 'malithi', 'senuri', 'kushani', 'shani',
    'menaka', 'anushka', 'pavithra', 'gayani', 'anoma', 'kumari', 'damayanthi', 'kusum',
    'subhashini', 'manori', 'ruwini', 'danushi', 'ashani', 'dulani', 'nayana', 'samadhi',
    'yasasvi', 'tharushika', 'harshani', 'udari', 'dulanjali', 'lakmali', 'niluka', 'kusalya'
  ]);

  if (femaleNames.has(firstName)) return true;

  // Typical Sinhala feminine suffixes
  if (/(ini|ani|athi|sha|ali|uni|uri|adi|ushi|ari|ika)$/i.test(firstName)) {
    return true;
  }

  return false;
};

// ============================================================
// Student Profile
// Displays real student details from database & allows editing
// ============================================================
export const Profile = () => {
  const { user, updateProfile } = useAuth();

  // Profile data and status state
  const [student, setStudent] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  // Edit profile modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    phone: '',
    grade: ''
  });

  // Load the currently logged-in student's data from database
  useEffect(() => {
    let isMounted = true;

    // Load student data from database
    const loadStudentData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!user?.id) {
          setLoading(false);
          return;
        }

        // 1. Get student data from database
        const studentRecord = await apiService.getStudentById(user.id);
        const activeStudent = studentRecord || user;

        // 2. Payment status
        const paymentRecord = await apiService.getStudentPaymentStatus(activeStudent.id || user.id);

        // 3. Unit topics for student's grade
        const studentGrade = activeStudent.grade || '';
        const gradeTopics = await apiService.getMathematicsTopics(studentGrade);

        if (isMounted) {
          setStudent(activeStudent);
          setPaymentInfo(paymentRecord);
          setTopics(gradeTopics);
          setEditFormData({
            name: activeStudent.name || '',
            phone: activeStudent.phone || '',
            grade: activeStudent.grade || 'Grade 11 (O/L Mathematics)'
          });
        }
      } catch (err) {
        console.error('Failed to load student profile data:', err);
        if (isMounted) {
          setError('Failed to retrieve student profile from database.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadStudentData();

    return () => {
      isMounted = false;
    };
  }, [user]);

  // Open edit profile modal
  const handleOpenEdit = () => {
    if (student) {
      setEditFormData({
        name: student.name || '',
        phone: student.phone || '',
        grade: student.grade || 'Grade 11 (O/L Mathematics)'
      });
    }
    setIsEditModalOpen(true);
  };

  // Save profile changes to database
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await updateProfile({
        name: editFormData.name.trim(),
        phone: editFormData.phone.trim(),
        grade: editFormData.grade
      });

      if (res.success) {
        // Re-fetch updated student record from database
        const freshStudent = await apiService.getStudentById(user.id);
        const updatedStudent = freshStudent || res.user;
        setStudent(updatedStudent);

        // Re-fetch topics in case grade changed
        if (editFormData.grade !== student?.grade) {
          const freshTopics = await apiService.getMathematicsTopics(editFormData.grade);
          setTopics(freshTopics);
        }

        setIsEditModalOpen(false);
        setSuccessMsg('Profile information updated successfully in database!');
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        setError(res.message || 'Could not save profile changes.');
      }
    } catch (err) {
      console.error('Error saving profile changes:', err);
      setError(err.message || 'Failed to save changes. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fileInputRef = useRef(null);
  const [imgLoadError, setImgLoadError] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  // Trigger device file selection when camera icon is clicked
  const handleTriggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Upload and save profile photo from device
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, JPEG, WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Selected image is too large. Please select an image under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Image = event.target?.result;
      if (!base64Image) return;

      try {
        setIsUploadingPhoto(true);
        setError(null);
        setImgLoadError(false);

        // Update local state immediately for instant feedback
        setStudent((prev) => ({
          ...prev,
          avatar: base64Image
        }));

        // Persist to database & AuthContext
        const res = await updateProfile({
          avatar: base64Image
        });

        if (res.success) {
          setSuccessMsg('Profile photo updated successfully from your device!');
          setTimeout(() => setSuccessMsg(''), 4000);
        } else {
          setError(res.message || 'Failed to save updated photo.');
        }
      } catch (err) {
        console.error('Failed to upload photo:', err);
        setError('Error uploading image from device.');
      } finally {
        setIsUploadingPhoto(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };

    reader.readAsDataURL(file);
  };

  // Reset to default gender-based avatar photo
  const handleResetToDefaultPhoto = async () => {
    try {
      setIsUploadingPhoto(true);
      setError(null);
      setImgLoadError(false);
      const isFemale = isFemaleStudentName(student?.name || user?.name);
      const defaultAvatar = isFemale ? DEFAULT_FEMALE_AVATAR : DEFAULT_MALE_AVATAR;

      setStudent((prev) => ({
        ...prev,
        avatar: defaultAvatar
      }));

      const res = await updateProfile({
        avatar: defaultAvatar
      });

      if (res.success) {
        setSuccessMsg(`Profile avatar reset to student clip art (${isFemale ? 'Girl' : 'Boy'})!`);
        setTimeout(() => setSuccessMsg(''), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  // Switch to Dark Blue initials avatar
  const handleSetInitialsAvatar = async () => {
    try {
      setIsUploadingPhoto(true);
      setError(null);

      setStudent((prev) => ({
        ...prev,
        avatar: 'initials'
      }));

      const res = await updateProfile({
        avatar: 'initials'
      });

      if (res.success) {
        setSuccessMsg('Profile avatar set to Dark Blue initial!');
        setTimeout(() => setSuccessMsg(''), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[350px] space-y-3">
        <div className="w-10 h-10 border-4 border-[#003153] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-bold text-slate-500">Loading student profile...</p>
      </div>
    );
  }

  // Profile data from database
  const activeName = student?.name || user?.name || 'Student';
  const nameInitial = activeName.charAt(0).toUpperCase();
  const activeStudentId = student?.studentId || student?.indexNo || 'N/A';
  const activeGrade = student?.grade || 'Grade 11 (O/L Mathematics)';
  const activePhone = student?.phone || 'Not provided';
  const activeEmail = student?.email || 'N/A';
  const activeSubject = student?.subject || 'Mathematics';
  const activeEnrollmentDate = student?.enrollmentDate || '2024-01-10';
  const activeEnrollmentStatus = student?.enrollmentStatus || 'Active';

  // Profile avatar logic:
  // 1. If student uploaded a custom photo, use student.avatar
  // 2. If 'initials', show dark blue background with initials only
  // 3. Otherwise, automatic men / women profile picture based on their given name
  const isFemale = isFemaleStudentName(activeName);
  const defaultGenderAvatar = isFemale ? DEFAULT_FEMALE_AVATAR : DEFAULT_MALE_AVATAR;

  let activeAvatarUrl = null;
  if (student?.avatar === 'initials') {
    activeAvatarUrl = null;
  } else if (student?.avatar) {
    activeAvatarUrl = student.avatar;
  } else if (user?.avatar && user?.avatar !== 'initials') {
    activeAvatarUrl = user.avatar;
  } else {
    activeAvatarUrl = defaultGenderAvatar;
  }

  if (imgLoadError) {
    activeAvatarUrl = null;
  }

  // Grade display
  const gradeMatch = activeGrade.match(/Grade\s*(\d+)/i);
  const gradeNumber = gradeMatch ? `Grade ${gradeMatch[1]}` : activeGrade;
  const gradeSubtext = activeGrade.includes('(')
    ? activeGrade.substring(activeGrade.indexOf('('))
    : activeGrade.replace(/Grade\s*\d+/i, '').trim() || '(Mathematics)';

  // Payment status
  const currentPaymentStatus = paymentInfo?.status || student?.paymentStatus || 'Paid';
  const isPaid = /paid|approved|success/i.test(currentPaymentStatus);
  const isPending = /pending/i.test(currentPaymentStatus);
  const nextPaymentDue = paymentInfo?.nextDue || student?.nextPaymentDue || '2026-11-15';

  // Unit topics and lesson progress
  const totalLessons = topics.length > 0
    ? topics.reduce((acc, t) => acc + (Number(t.lessonsCount) || 0), 0)
    : 30;

  const completedLessons = topics.length > 0
    ? topics.reduce(
      (acc, t) => acc + Math.round(((Number(t.progress) || 0) / 100) * (Number(t.lessonsCount) || 0)),
      0
    )
    : 12;

  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 40;

  // Progress ring math
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (overallProgress / 100) * circumference;

  return (
    <div className="space-y-6 pb-8">
      {/* Hidden Device File Picker for Camera Icon */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Success Notification Alert */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center justify-between gap-3 shadow-xs transition-all">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
          <button
            onClick={() => setSuccessMsg('')}
            className="text-emerald-700 hover:text-emerald-900 text-xs font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Error Notification Alert */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-semibold flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-rose-700 hover:text-rose-900 text-xs font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Profile Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#002f5a] via-[#00386c] to-[#004884] text-white shadow-xl shadow-[#00223d]/20 border border-white/10 min-h-[160px] sm:min-h-[175px] flex items-center">
        {/* Soft radial glow behind right graphic */}
        <div className="absolute right-36 sm:right-60 top-1/2 -translate-y-1/2 w-64 h-64 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />

        {/* Ambient subtle curved waves */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
          viewBox="0 0 1000 160"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M-50,160 C150,100 320,170 540,115 C720,70 870,140 1050,90 L1050,160 Z"
            fill="#001d36"
            fillOpacity="0.7"
          />
        </svg>

        {/* Right side illustration: Books & Grad Cap with leaf sprigs and slogan */}
        <div className="absolute right-4 sm:right-8 lg:right-12 top-0 bottom-0 h-full flex items-center justify-end pointer-events-none select-none">
          <div className="relative flex items-center gap-3 sm:gap-4">
            {/* 3D Graduation cap on stacked blue books */}
            <div className="relative w-28 sm:w-36 lg:w-44 h-28 sm:h-36 lg:h-40 flex items-center justify-center shrink-0">
              {/* Botanical Leaf Twigs SVG (Left side) */}
              <svg
                className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 w-10 sm:w-14 h-16 sm:h-20 text-sky-300/80 pointer-events-none"
                viewBox="0 0 40 70"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M35 60 C25 45 20 30 25 10" />
                <path d="M26 48 C18 48 15 40 22 38" fill="currentColor" fillOpacity="0.3" />
                <path d="M23 34 C15 32 14 24 22 23" fill="currentColor" fillOpacity="0.3" />
                <path d="M25 20 C18 17 20 10 26 11" fill="currentColor" fillOpacity="0.3" />
              </svg>

              <img
                src={gradCapTransparent}
                alt="Academic Graduation Cap & Books"
                className="w-full h-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.35)]"
              />

              {/* Botanical Leaf Twigs SVG (Right side) */}
              <svg
                className="absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 w-10 sm:w-14 h-16 sm:h-20 text-sky-300/80 pointer-events-none"
                viewBox="0 0 40 70"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 60 C15 45 20 30 15 10" />
                <path d="M14 48 C22 48 25 40 18 38" fill="currentColor" fillOpacity="0.3" />
                <path d="M17 34 C25 32 26 24 18 23" fill="currentColor" fillOpacity="0.3" />
                <path d="M15 20 C22 17 20 10 14 11" fill="currentColor" fillOpacity="0.3" />
              </svg>
            </div>

            {/* Stylized Handwritten Text: "Better Learning Brighter Future" */}
            <div className="hidden sm:flex flex-col text-right pr-2">
              <span
                style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
                className="text-2xl lg:text-3xl font-bold text-sky-200 tracking-wide leading-tight drop-shadow-md select-none transform -rotate-1"
              >
                Better
              </span>
              <span
                style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
                className="text-2xl lg:text-3xl font-bold text-sky-200 tracking-wide leading-tight drop-shadow-md select-none transform -rotate-1 pl-2"
              >
                Learning
              </span>
              <span
                style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
                className="text-2xl lg:text-3xl font-bold text-sky-100 tracking-wide leading-tight drop-shadow-md select-none transform -rotate-1"
              >
                Brighter
              </span>
              <span
                style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
                className="text-2xl lg:text-3xl font-bold text-sky-100 tracking-wide leading-tight drop-shadow-md select-none transform -rotate-1 pl-3"
              >
                Future
              </span>
            </div>
          </div>
        </div>

        {/* Banner Content (Left side: Avatar, Heading, Subtitle) */}
        <div className="relative z-10 flex items-center gap-5 sm:gap-6 px-6 sm:px-10 py-6 w-full max-w-xl">
          {/* Circular Avatar with Photo/Initial and Camera Badge */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#003153] border-4 border-white shadow-xl flex items-center justify-center font-extrabold text-white text-3xl sm:text-4xl select-none overflow-hidden relative">
              {activeAvatarUrl ? (
                <img
                  src={activeAvatarUrl}
                  alt={activeName}
                  className="w-full h-full object-cover"
                  onError={() => setImgLoadError(true)}
                />
              ) : (
                <span className="select-none">{nameInitial}</span>
              )}
              {isUploadingPhoto && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={handleTriggerFileSelect}
              title="Select profile photo from device"
              aria-label="Select profile photo from device"
              className="absolute -bottom-1 -right-1 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#003153] shadow-md border border-slate-200 flex items-center justify-center hover:bg-blue-50 transition-transform active:scale-90 cursor-pointer z-10"
            >
              <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#003153]" />
            </button>
          </div>

          {/* Heading & Subtitle */}
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Student Profile
            </h1>
            <p className="text-xs sm:text-sm text-blue-100/90 font-medium leading-relaxed max-w-md">
              View and update your personal information and account details
            </p>
          </div>
        </div>
      </div>

      {/* 4 Highlight Cards: Grade, Student ID, WhatsApp, Enrollment */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Grade */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex items-center gap-4 transition-all hover:shadow-sm hover:border-blue-200">
          <div className="w-12 h-12 rounded-2xl bg-[#003153] text-white flex items-center justify-center shrink-0 shadow-sm">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-500">Grade</p>
            <p className="text-base sm:text-lg font-extrabold text-slate-900 truncate">
              {gradeNumber}
            </p>
            <p className="text-xs font-medium text-slate-400 truncate">
              {gradeSubtext}
            </p>
          </div>
        </div>

        {/* Student ID */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex items-center gap-4 transition-all hover:shadow-sm hover:border-blue-200">
          <div className="w-12 h-12 rounded-2xl bg-[#0ea5e9] text-white flex items-center justify-center shrink-0 shadow-sm">
            <CreditCard className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-500">Student ID</p>
            <p className="text-base sm:text-lg font-extrabold text-slate-900 font-mono tracking-tight truncate">
              {activeStudentId}
            </p>
            <p className="text-xs font-medium text-slate-400 truncate">
              Unique Student Identifier
            </p>
          </div>
        </div>

        {/* WhatsApp contact */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex items-center gap-4 transition-all hover:shadow-sm hover:border-blue-200">
          <div className="w-12 h-12 rounded-2xl bg-[#10b981] text-white flex items-center justify-center shrink-0 shadow-sm">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-500">WhatsApp</p>
            <p className="text-base sm:text-lg font-extrabold text-slate-900 truncate">
              {activePhone}
            </p>
            <p className="text-xs font-medium text-slate-400 truncate">
              Contact Number
            </p>
          </div>
        </div>

        {/* Enrollment status */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex items-center gap-4 transition-all hover:shadow-sm hover:border-blue-200">
          <div className="w-12 h-12 rounded-2xl bg-[#003153] text-white flex items-center justify-center shrink-0 shadow-sm">
            <UserCheck className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-500">Enrollment Status</p>
            <div className="mt-0.5">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-100 text-emerald-700 inline-block">
                Active
              </span>
            </div>
            <p className="text-xs font-medium text-slate-400 mt-0.5 truncate">
              Currently Enrolled
            </p>
          </div>
        </div>
      </div>

      {/* Profile Details & Status Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Profile details card */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-6">
          {/* Header Row with Avatar & Name */}
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
            <div className="relative shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#003153] text-white text-2xl sm:text-3xl font-extrabold flex items-center justify-center shadow-md border-4 border-slate-100 overflow-hidden relative">
                {activeAvatarUrl ? (
                  <img
                    src={activeAvatarUrl}
                    alt={activeName}
                    className="w-full h-full object-cover"
                    onError={() => setImgLoadError(true)}
                  />
                ) : (
                  <span className="select-none">{nameInitial}</span>
                )}
                {isUploadingPhoto && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={handleTriggerFileSelect}
                title="Select profile photo from device"
                aria-label="Select profile photo from device"
                className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white text-[#003153] shadow border border-slate-200 flex items-center justify-center hover:bg-blue-50 transition-transform active:scale-90 cursor-pointer z-10"
              >
                <Camera className="w-3.5 h-3.5 text-[#003153]" />
              </button>
            </div>

            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {activeName}
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-500">
                Student
              </p>
              <div>
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-100 text-emerald-700 inline-block">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Grid of Dynamic Information Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            {/* 1. Full Name */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center gap-3.5 transition-colors hover:bg-blue-50/40">
              <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-600 flex items-center justify-center shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
                  Full Name
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 truncate block mt-0.5">
                  {activeName}
                </span>
              </div>
            </div>

            {/* 2. Student ID */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center gap-3.5 transition-colors hover:bg-blue-50/40">
              <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-600 flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
                  Student ID
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 font-mono truncate block mt-0.5">
                  {activeStudentId}
                </span>
              </div>
            </div>

            {/* 3. Grade */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center gap-3.5 transition-colors hover:bg-blue-50/40">
              <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-600 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
                  Grade
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 truncate block mt-0.5">
                  {activeGrade}
                </span>
              </div>
            </div>

            {/* 4. Course / Subject */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center gap-3.5 transition-colors hover:bg-blue-50/40">
              <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-600 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
                  Course / Subject
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 truncate block mt-0.5">
                  {activeSubject}
                </span>
              </div>
            </div>

            {/* 5. Enrollment Date */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center gap-3.5 transition-colors hover:bg-blue-50/40">
              <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-600 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
                  Enrollment Date
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 truncate block mt-0.5">
                  {activeEnrollmentDate}
                </span>
              </div>
            </div>

            {/* 6. Enrollment Status */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center gap-3.5 transition-colors hover:bg-blue-50/40">
              <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
                  Enrollment Status
                </span>
                <div className="mt-0.5">
                  <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-100 text-emerald-700 inline-block">
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* 7. WhatsApp Contact */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center gap-3.5 transition-colors hover:bg-blue-50/40">
              <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-600 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
                  WhatsApp / Phone
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 truncate block mt-0.5">
                  {activePhone}
                </span>
              </div>
            </div>

            {/* 8. Email Address */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center gap-3.5 transition-colors hover:bg-blue-50/40">
              <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-600 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
                  Email Address
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 truncate block mt-0.5">
                  {activeEmail}
                </span>
              </div>
            </div>
          </div>

          {/* Edit Profile Action Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleOpenEdit}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#003153] hover:bg-[#00223d] shadow-sm transition-all active:scale-[0.98]"
            >
              <Pencil className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* Payment status, student status, and quick info */}
        <div className="lg:col-span-5 space-y-5">
          {/* Payment status */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  Payment Status
                </h3>
              </div>

              {isPaid ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold bg-[#10b981] text-white shadow-xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Paid</span>
                </span>
              ) : isPending ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold bg-[#f59e0b] text-white shadow-xs">
                  <span>Pending</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold bg-[#ef4444] text-white shadow-xs">
                  <span>Unpaid</span>
                </span>
              )}
            </div>

            <div className="flex items-center justify-between pt-1">
              <p className="text-xs text-slate-500 font-medium">
                Next payment due:{' '}
                <span className="font-bold text-slate-700 ml-1">
                  {nextPaymentDue}
                </span>
              </p>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Student status */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-800">
                Student Status
              </h3>
            </div>

            {/* Sub-card with Grade, Currently Enrolled & Active badge */}
            <div className="bg-[#f0f7fd] border border-[#d0e5f5] rounded-xl p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                    {activeGrade}
                  </p>
                  <p className="text-[11px] font-medium text-slate-500">
                    Currently Enrolled
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-100 text-emerald-700 shrink-0">
                Active
              </span>
            </div>
          </div>

          {/* Quick information */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-800">
                Quick Information
              </h3>
            </div>

            {/* 3 Stats: Total Lessons, Completed, Donut Overall Progress */}
            <div className="grid grid-cols-3 gap-3 items-center pt-1">
              {/* Total Lessons */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-100/70 text-blue-600 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-[11px] font-semibold text-slate-400">
                    Total Lessons
                  </p>
                  <p className="text-base sm:text-lg font-extrabold text-slate-900">
                    {totalLessons}
                  </p>
                </div>
              </div>

              {/* Completed */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100/70 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-[11px] font-semibold text-slate-400">
                    Completed
                  </p>
                  <p className="text-base sm:text-lg font-extrabold text-slate-900">
                    {completedLessons}
                  </p>
                </div>
              </div>

              {/* Overall Progress Donut Chart */}
              <div className="flex items-center justify-center gap-2">
                <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 60 60">
                    {/* Background circle */}
                    <circle
                      cx="30"
                      cy="30"
                      r={radius}
                      stroke="#e2e8f0"
                      strokeWidth="4"
                      fill="transparent"
                    />
                    {/* Animated Progress Arc */}
                    <circle
                      cx="30"
                      cy="30"
                      r={radius}
                      stroke="#0284c7"
                      strokeWidth="4"
                      strokeDasharray={circumference}
                      strokeDashoffset={progressOffset}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  <span className="absolute text-[11px] font-extrabold text-slate-900">
                    {overallProgress}%
                  </span>
                </div>
                <div className="hidden sm:block">
                  <span className="text-[10px] font-bold text-slate-500 leading-tight block">
                    Overall
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 leading-tight block">
                    Progress
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save profile changes (Edit Modal) */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#003153]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Pencil className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Edit Student Profile
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Update your personal information in the database
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProfile} className="p-6 space-y-4">
              {/* Profile Photo Selector in Modal */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-full bg-[#003153] text-white font-extrabold text-xl flex items-center justify-center shrink-0 overflow-hidden border-2 border-white shadow-sm relative">
                  {activeAvatarUrl ? (
                    <img src={activeAvatarUrl} alt={activeName} className="w-full h-full object-cover" />
                  ) : (
                    <span>{nameInitial}</span>
                  )}
                  {isUploadingPhoto && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800">Profile Photo</p>
                  <p className="text-[11px] text-slate-500 mb-2">Select from device or choose avatar style</p>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={handleTriggerFileSelect}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#003153] text-white hover:bg-[#00223d] transition-colors cursor-pointer shadow-xs"
                    >
                      <Camera className="w-3 h-3" /> Select from Device
                    </button>
                    <button
                      type="button"
                      onClick={handleResetToDefaultPhoto}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      Default Clip Art ({isFemale ? 'Girl' : 'Boy'})
                    </button>
                    <button
                      type="button"
                      onClick={handleSetInitialsAvatar}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      Dark Blue Initial
                    </button>
                  </div>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                />
              </div>

              {/* WhatsApp Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  WhatsApp Contact Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.phone}
                  onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                  placeholder="e.g. +94 77 123 4567"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                />
              </div>

              {/* Class Stream / Grade */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Grade / Class Stream <span className="text-rose-500">*</span>
                </label>
                <select
                  value={editFormData.grade}
                  onChange={(e) => setEditFormData({ ...editFormData, grade: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                >
                  <option value="Grade 11 (O/L Mathematics)">Grade 11 (O/L Mathematics)</option>
                  <option value="Grade 10 Mathematics">Grade 10 Mathematics</option>
                  <option value="Grade 9 Mathematics">Grade 9 Mathematics</option>
                  <option value="Grade 8 Mathematics">Grade 8 Mathematics</option>
                  <option value="Grade 7 Mathematics">Grade 7 Mathematics</option>
                  <option value="Grade 6 Mathematics">Grade 6 Mathematics</option>
                </select>
              </div>

              {/* Read-Only: Student ID */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-500">
                    Student ID
                  </label>
                  <span className="flex items-center gap-1 text-[10px] text-slate-400 font-semibold">
                    <Lock className="w-3 h-3" /> System Identifier
                  </span>
                </div>
                <input
                  type="text"
                  disabled
                  value={activeStudentId}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 text-xs font-mono cursor-not-allowed"
                />
              </div>

              {/* Read-Only: Email Address */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-500">
                    Email Address
                  </label>
                  <span className="flex items-center gap-1 text-[10px] text-slate-400 font-semibold">
                    <Lock className="w-3 h-3" /> Primary Login Credential
                  </span>
                </div>
                <input
                  type="email"
                  disabled
                  value={activeEmail}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 text-xs cursor-not-allowed"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#003153] hover:bg-[#00223d] shadow transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Changes</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
