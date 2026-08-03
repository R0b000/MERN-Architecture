import { useState, useEffect, useCallback } from 'react';
import { BannerService } from '../../services/BannerService';

interface IBanner {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  mobileImageUrl: string;
  linkUrl: string;
  linkText: string;
  position: string;
  sortOrder: number;
  isActive: boolean;
}

interface IFormData {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  mobileImageUrl: string;
  linkUrl: string;
  linkText: string;
  position: string;
  sortOrder: number;
}

const initialFormData: IFormData = {
  title: '',
  subtitle: '',
  description: '',
  imageUrl: '',
  mobileImageUrl: '',
  linkUrl: '',
  linkText: 'Shop Now',
  position: 'home',
  sortOrder: 0
};

export const useAdminBanners = () => {
  const [banners, setBanners] = useState<IBanner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingBanner, setEditingBanner] = useState<IBanner | null>(null);
  const [formData, setFormData] = useState<IFormData>(initialFormData);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const loadBanners = useCallback(async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await BannerService.getAllBanners({ page, pageSize: 10 });
      
      if (response.success && response.data) {
        setBanners(response.data.banners);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.page);
      }
    } catch (error) {
      console.error('Failed to load banners:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBanners();
  }, [loadBanners]);

  const handlePageChange = (page: number) => {
    loadBanners(page);
  };

  const handleCreate = () => {
    setEditingBanner(null);
    setFormData(initialFormData);
    setShowModal(true);
  };

  const handleEdit = (banner: IBanner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle || '',
      description: banner.description || '',
      imageUrl: banner.imageUrl,
      mobileImageUrl: banner.mobileImageUrl || '',
      linkUrl: banner.linkUrl,
      linkText: banner.linkText || '',
      position: banner.position,
      sortOrder: banner.sortOrder
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      try {
        const response = await BannerService.deleteBanner(id);
        
        if (response.success) {
          loadBanners(currentPage);
        } else {
          alert(response.messages?.[0] || 'Failed to delete banner');
        }
      } catch (error) {
        console.error('Failed to delete banner:', error);
        alert('An error occurred while deleting the banner');
      }
    }
  };

  const handleToggleStatus = async (id: string, isActive: boolean) => {
    try {
      const response = await BannerService.toggleBannerStatus(id, isActive);
      
      if (response.success) {
        loadBanners(currentPage);
      } else {
        alert(response.messages?.[0] || 'Failed to update banner status');
      }
    } catch (error) {
      console.error('Failed to toggle banner status:', error);
      alert('An error occurred while updating the banner status');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let response;
      
      if (editingBanner) {
        response = await BannerService.updateBanner(editingBanner._id, formData);
      } else {
        response = await BannerService.createBanner(formData);
      }
      
      if (response.success) {
        setShowModal(false);
        loadBanners(currentPage);
      } else {
        alert(response.messages?.[0] || 'Operation failed');
      }
    } catch (error) {
      console.error('Failed to save banner:', error);
      alert('An error occurred while saving the banner');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingBanner(null);
    setFormData(initialFormData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'sortOrder' ? parseInt(value) || 0 : value
    }));
  };

  return {
    banners,
    loading,
    showModal,
    editingBanner,
    formData,
    totalPages,
    currentPage,
    handlePageChange,
    handleCreate,
    handleEdit,
    handleDelete,
    handleToggleStatus,
    handleSubmit,
    handleCloseModal,
    handleInputChange
  };
};

